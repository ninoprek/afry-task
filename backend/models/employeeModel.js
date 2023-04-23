const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an employee name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  }
},{
  timestamp: true
});

module.exports = mongoose.model('Employee', employeeSchema);