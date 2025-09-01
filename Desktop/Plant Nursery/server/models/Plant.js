const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Indoor', 'Outdoor', 'Herbs & Vegetables', 'Flowers'],
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  careDifficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  description: {
    type: String,
  },
}, { timestamps: true });

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
