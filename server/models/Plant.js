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
  stock: {
    type: Number,
    required: true,
    default: 25,
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
  careInstructions: {
    Light: String,
    Watering: String,
    Soil: String,
    Temperature: String,
    Humidity: String,
    Pests: String,
  },
}, { timestamps: true });

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
