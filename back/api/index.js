import express from 'express';
import { logger } from './middleware.js';
import routes from './routes.js';

const app = express();
const PORT = process.env.PORT ?? 3069;

app.use(logger);
app.use(routes);
app.use(
    express.urlencoded({
      extended: true,
    })
);
app.use(express.json());

export function init() {
  app.listen(PORT, ()=> {
    console.log(`Server started on ${PORT}`);
  })
}

process.on('SIGINT', _ => {
  console.log('server stop',);
});
