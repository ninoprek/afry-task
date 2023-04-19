const asyncHandler = require('express-async-handler');
const Company = require('../models/companyModel');

// @desc    Get Companies
// @route   GET /api/companies
// @access  Private
const getCompanies = asyncHandler(async (req, res) => {
  const companies = await Company.find();

  res.status(200).json(companies);
})

// @desc    Set Companies
// @route   POST /api/companies
// @access  Private
const setCompany = asyncHandler(async (req, res) => {
  console.log(req.body);
  if (!req.body.name) {
    res.status(400)
    throw new Error('Please add a company name.');
  }

  const company = await Company.create({
    name: req.body.name
  });

  res.status(200).json({ message:  'Company created', body: company });
})
// @desc    Update Company
// @route   PUT /api/companies
// @access  Private
const updateCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(400);
    throw new Error('Company not found')
  }

  const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });


  res.status(200).json({ message:  `Updated company ${ req.params.id }`, body: updatedCompany });
})
// @desc    Delete Company
// @route   DELETE /api/companies
// @access  Private
const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(400);
    throw new Error('Company not found')
  }
  console.log(
    company
  );

  await company.deleteOne();

  res.status(200).json({ message:  `Deleted company ${ req.params.id }`, body: req.params.id });
})


module.exports = {
  getCompanies,
  setCompany,
  updateCompany,
  deleteCompany
}