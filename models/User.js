const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  id: mongoose.Types.ObjectId,
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.export = mongoose.model('User', userSchema);