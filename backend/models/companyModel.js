const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a text value for company name']
  },
  employees: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
},{
  timestamps: true
});

module.exports = mongoose.model('Company', companySchema);