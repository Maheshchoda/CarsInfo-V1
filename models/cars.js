const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carName: String,
  carPrice: String,
  img: String,
  info: String,
});

module.exports = mongoose.model('Cars', carSchema);
