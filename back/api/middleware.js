import { environment } from '../environments/environment.js';

export function middleware(req, res, next) {
  logger(req, res, next);
  accessControl(req, res, next);
  next();
}

export function logger(req, res, next) {
  console.log('log:_______');
}

export function accessControl(req, res) {
  const origin = req.headers.host;
  const referer = req.headers.referer;
  environment.whiteList.find((host, i) => {
    if (!!referer && !!referer.includes(host)) {
      setCORS(res, host);
    } else if (!referer && !!origin && !!origin.includes(host)) {
      setCORS(res, origin);
    }
  });
}

function setCORS(res, host) {
  res.header("Access-Control-Allow-Origin", host);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT, POST, DELETE');
}
