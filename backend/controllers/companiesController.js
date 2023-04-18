const asyncHandler = require('express-async-handler');

// @desc    Get Companies
// @route   GET /api/goals
// @access  Private
const getCompanies = asyncHandler(async (req, res) => {
  res.status(200).json({ message:  'Get companies' });
})

// @desc    Set Companies
// @route   POST /api/goals
// @access  Private
const setCompany = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field');
  }
  else res.status(200).json({ message:  'Create companies' });
})
// @desc    Update Company
// @route   PUT /api/goals
// @access  Private
const updateCompany = asyncHandler(async (req, res) => {
  res.status(200).json({ message:  `Updated company ${ req.params.id }` });
})
// @desc    Delete Company
// @route   DELETE /api/goals
// @access  Private
const deleteCompany = asyncHandler(async (req, res) => {
  res.status(200).json({ message:  `Deleted company ${ req.params.id }` });
})


module.exports = {
  getCompanies,
  setCompany,
  updateCompany,
  deleteCompany
}