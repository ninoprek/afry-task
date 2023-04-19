const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a text value for company name']
  }
},{
  timestamps: true
});

module.exports = mongoose.model('Company', companySchema);