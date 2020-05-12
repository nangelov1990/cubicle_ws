const mongoose = require('mongoose');
const accessorySchema = mongoose.Schema({
  id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxLength: 255
  },
  cubes: [{ type: mongoose.Types.ObjectId, ref: 'Cube' }]
});

module.exports = mongoose.model('Accessory', accessorySchema);