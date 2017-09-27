const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
  id: String,
  name: String,
  rating: Number,
  attendants_number: Number,
});

module.exports = mongoose.model('Bar', barSchema);
