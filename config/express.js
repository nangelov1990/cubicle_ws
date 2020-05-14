const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');
const appConfig = require('../app-config');

module.exports = (app) => {
  // Setup the view engine
  app.engine('.hbs', handlebars({ extname: 'hbs', defaultLayout: false }));
  app.set('views', path.resolve(__basedir, 'views'));

  // Setup the body parser
  app.use(express.urlencoded({ extended: false }));

  // Setup the cookie parser
  app.use(cookieParser(appConfig.cookieSecret));

  // Setup the static files
  app.use(express.static(path.resolve(__basedir, 'static')));
};