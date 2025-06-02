const mongoose = require('mongoose');

const windowsErrorSchema = new mongoose.Schema({
  error_code: {
    type: String,
    required: [true, 'Error code is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long']
  },
  solution: {
    type: String,
    required: [true, 'Solution is required']
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
}

);

module.exports = mongoose.model('WindowsError', windowsErrorSchema);
