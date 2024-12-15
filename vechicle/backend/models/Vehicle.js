const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  pricePerDay: Number,
  availability: { type: Boolean, default: true },
  imageUrl: String,
  location: String,
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
