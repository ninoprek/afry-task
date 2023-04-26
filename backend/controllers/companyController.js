const asyncHandler = require('express-async-handler');
const Company = require('../models/companyModel');
const Employee = require('../models/employeeModel');

// @desc    Get Companies
// @route   GET /api/companies
// @access  Private
const getCompanies = asyncHandler(async (req, res) => {
  const ownedCompanies = await Company.find({ user: req.user.id });
  const otherCompanies = await Company.find({ user: { $ne: req.user.id} });

  res.status(200).json({ owned: ownedCompanies, other: otherCompanies });
})

// @desc    Get one company
// @route   GET /api/companies/id
// @access  Public
const getCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(400);
    throw new Error('Company not found')
  }

  const employees = await Employee.find({"_id": {"$in": company["employees"]}});

  res.status(200).json({ message:  `Company data ${ company.id }`, body: {company: company, employees: employees} });
})

// @desc    Set Companies
// @route   POST /api/companies
// @access  Private
const setCompany = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400)
    throw new Error('Please add a company name.');
  }

  const company = await Company.create({
    name: req.body.name,
    user: req.user.id,
    employees: []
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

  if (!req.user) {
    res.status(401);
    throw new Error ('User not found');
  }

  // Check if logged user is the same as the user who created the company
  if (company.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorised');
  }

  const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });


  res.status(200).json({ message:  `Updated company ${ req.params.id }`, body: updatedCompany });
})
// @desc    Delete Company
// @route   DELETE /api/companies/id
// @access  Private
const deleteCompany = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) {
    res.status(400);
    throw new Error('Company not found')
  }

  if (!req.user) {
    res.status(401);
    throw new Error ('User not found');
  }

  // Check if logged user is the same as the user who created the company
  if (company.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorised');
  }

  if (company.employees.length > 0) {
    const employees = await Employee.updateMany({"_id": {"$in": company["employees"]}}, { company: null });
  }

  await company.deleteOne();

  res.status(200).json({ message:  `Deleted company ${ req.params.id }`, id: req.params.id });
})

module.exports = {
  getCompany,
  getCompanies,
  setCompany,
  updateCompany,
  deleteCompany
}