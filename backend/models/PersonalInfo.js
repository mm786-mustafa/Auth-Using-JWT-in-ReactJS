const mongoose = require('mongoose');

const piSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This assumes you have a 'User' model defined elsewhere
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('PersonalInfo', piSchema);