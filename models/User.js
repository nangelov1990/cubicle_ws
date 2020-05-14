const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const appConfig = require('../app-config');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods = {
  matchPassword: function (password) {
    return bcrypt.compare(password, this.password);
  }
}

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt
      .genSalt(appConfig.saltRounds)
      .then(salt => {
        return bcrypt.hash(this.password, salt);
      })
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(err => {
        next(err);
        return;
      })
  } else {
    next();
  }
});

module.exports = mongoose.model('User', userSchema);