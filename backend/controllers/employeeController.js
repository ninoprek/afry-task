const asyncHandler = require('express-async-handler');
const Employee = require('../models/employeeModel');
const Company = require('../models/companyModel');

// @desc    Create new employee
// @route   POST /api/users
// @access  Public
const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, company } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please add employee name');
  }

  const employeeExists = await Employee.findOne({ email });

  if (employeeExists) {
    res.status(400);
    throw new Error('Employee already exsists');
  }

  // Create employee
  const employee = await Employee.create({
    name,
    email,
    company
  })


  if(employee) {
    // Update employee company
    if (company) {
      await Company.updateOne({_id: company}, {$push: {"employees": employee}});
    }

    res.status(201).json({
      _id: employee.id,
      name: employee.name,
      email: employee.email,
      company: employee.company,
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data')
  }
})

module.exports = {
  createEmployee
}