const jwt = require('./jwt');
const appConfig = require('../app-config');
const { userModel, tokenBlacklistModel } = require('../models');

function auth(req, res, next) {
  const token = req.cookies[appConfig.authCookieName];
  Promise
    .all([
      jwt.verifyToken(token),
      tokenBlacklistModel.findOne({ token })
    ])
    .then(([data, blacklistedToken]) => {
      if (blacklistedToken) {
        return new Promise
          .reject(new Error('blacklisted token'));
      }

      userModel
        .findById(data.id)
        .then(user => {
          req.user = user;
          next();
        });
    })
    .catch(err => {
      if (['token expired', 'blacklisted token'].includes(err.message)) {
        res.redirect('/login');
        return;
      }

      next(err);
    });
}

module.exports = auth;