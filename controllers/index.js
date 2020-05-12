const cubeController = require('./cube');
const accessoryController = require('./accessory');

function notFound(req, res, next) {
  const err = new Error('Page not found!');
  err.status = 404;

  next(err);
}

function errorHandler(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error =
    req.app.get('env') === 'development' ? err : {};
  console.error(err.message);

  res.status(err.status || 500);
  res.render('404.hbs');
}

function about(req, res, next) {
  res.render('about.hbs');
}

module.exports = {
  cubeController,
  accessoryController,
  notFound,
  errorHandler,
  about
}