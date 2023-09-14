import express from 'express';
import { logger, middleware } from './middleware.js';
import routes from './routes.js';
import { nowTime } from '../utils.js';
import { environment } from '../environments/environment.js';
import { setConfig } from '../automation/config/config.js';

const app = express();
const PORT = process.env.PORT ?? environment.port ?? 3069;

app.use(express.urlencoded());
app.use(express.json());
app.use(middleware);
app.use(routes);

export function init() {
  console.log('Server init');
  app.listen(PORT, ()=> {
    console.log(`Server "arnydashboard" started on ${PORT} at ${nowTime()}`);
  })
  setConfig('started', nowTime());
}

process.on('SIGINT', _ => {
  console.log(`server stopped at ${nowTime()}`);
});
