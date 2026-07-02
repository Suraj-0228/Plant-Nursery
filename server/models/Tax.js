const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: true,
    default: 5,
  }
}, { timestamps: true });

module.exports = mongoose.model('Tax', taxSchema);
