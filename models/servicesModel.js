//  importing the required libraries 
const mongoose = require('mongoose');
const validator = require('validator');
const serviceShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Shop name is required'],
    trim: true,
    minlength: [3, 'Shop name must be at least 3 characters long'],
    maxlength: [100, 'Shop name cannot exceed 100 characters']
  },
  area: {
    type: String,
    required: [true, 'area is required'],
    trim: true
  },
  gov: {
    type: String,
    required: [true, 'gov is required'],
    trim: true
  },
  rating: {
    type: Number,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot exceed 5'],
    default: 0
  },
  link: {
    type: String,
    required: [true, 'link is required'],
    trim: true,
    unique: true
  }
}, { timestamps: true });

// exporting and Creating the modules 
module.exports = mongoose.model('ServiceShop', serviceShopSchema);
