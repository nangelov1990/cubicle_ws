const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.connect(
    config.databaseConnection,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
}