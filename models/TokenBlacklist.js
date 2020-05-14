const mongoose = require('mongoose');

const tokenBlacklistSchema = mongoose.Schema({
  token: String
});

module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);