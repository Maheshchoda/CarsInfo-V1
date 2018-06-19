const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carName: {
    type: String,
    required: true,
  },
  carPrice: {
    type: String,
    required: true,
  },
  img: String,
  info: String,
});

module.exports = mongoose.model('Cars', carSchema);
