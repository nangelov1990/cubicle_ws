const mongoose = require('mongoose');
const cubeSchema = mongoose.Schema({
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
  difficultyLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  accessories: [{ type: mongoose.Types.ObjectId, ref: 'Accessory' }]
});

module.exports = mongoose.model('Cube', cubeSchema);