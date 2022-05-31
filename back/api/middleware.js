export function logger(req, res, next) {
  console.log('log:_______');
  next();
}

export default logger;
