const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  animalName: {
    type: String,
    trim: true,
  },
  categoryName: {
    type: String,
    trim: true,
  },
  file: { type: String },
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;
