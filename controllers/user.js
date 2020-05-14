const { userModel, tokenBlacklistModel } = require('../models/index');
const utils = require('../utils');
const appConfig = require('../app-config');

function getLogin(req, res, next) {
  res.render('login.hbs');
}

function postLogin(req, res, next) {
  const { username, password } = req.body;
  userModel
    .findOne({ username })
    .then(user => Promise.all([user, user.matchPassword(password)]))
    .then(([user, match]) => {
      if (!match) {
        res.render('login.hbs', { message: 'Wrong details' });
      }
      
      const token = utils.jwt.createToken({ id: user._id });
      res
        .cookie(appConfig.authCookieName, token)
        .redirect('/');
    })
}

function getRegister(req, res, next) {
  res.render('register.hbs');
}

function postRegister(req, res, next) {
  const { username, password, repeatPassword } = req.body;
  if (password !== repeatPassword) {
    res.render('register.hbs', {
      errors: {
        repeatPassword: 'Passwords do not match!'
      }
    });

    return;
  }
  
  userModel
    .findOne({ username })
    .then(user => {
      if (user) {
        res.render('register.hbs', {
          errors: {
            repeatPassword: 'Username already exists!'
          }
        });

        return;
      }

      return userModel.create ({ username, password });
    })
    .then(() => {
      res.redirect('/login');
    })
    .catch(next);
}

function logout(req, res, next) {
  const token = req.cookies[appConfig.authCookieName];
  tokenBlacklistModel
    .create({ token })
    .then(() => {
      res
        .clearCookie(appConfig.authCookieName)
        .redirect('/');
    });
}

module.exports = {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  logout
}