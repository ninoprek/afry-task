const asyncHandler = require('express-async-handler');
const Employee = require('../models/employeeModel');
const Company = require('../models/companyModel');

// @desc    Create new employee
// @route   POST /api/employees
// @access  Public
const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, position, company } = req.body;

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
    position,
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

// @desc    Remove employee
// @route   PUT /api/employees/remove
// @access  Private
const removeEmployee = asyncHandler(async (req, res) => {
  const { _id, email, company } = req.body;

  if (!req.user) {
    res.status(401);
    throw new Error ('User not found');
  }

  if (!email) {
    res.status(400);
    throw new Error('Please provide employee email');
  }

  const employee = await Employee.findByIdAndUpdate({_id}, { company: null });
  if (!employee) {
    res.status(400);
    throw new Error(`Employee doesn't exsists`);
  }

  if(employee) {
    // Update employee company
    await Company.findByIdAndUpdate(company, {$pull: {employees: employee._id}});

    res.status(201).json({
      _id: employee.id,
      name: employee.name,
      email: employee.email,
      company: employee.company,
    })
  }
})

// @desc    Add employee to company
// @route   PUT /api/employees/add
// @access  Private
const addEmployee = asyncHandler(async (req, res) => {
  const { employee, company_id } = req.body;

  if (!req.user) {
    res.status(401);
    throw new Error ('User not found');
  }

  if (!employee) {
    res.status(400);
    throw new Error('Please provide an employee to hire');
  }

  const addedEmployee = await Employee.findByIdAndUpdate(employee._id, { company: company_id });
  if (!addedEmployee) {
    res.status(400);
    throw new Error(`Employee doesn't exsists`);
  }

  if(addedEmployee) {
    // Update employee company
    const company = await Company.findByIdAndUpdate(company_id, {$push: {employees: addedEmployee}});

    res.status(201).json({
      _id: addedEmployee.id,
      name: addedEmployee.name,
      email: addedEmployee.email,
      company: company,
    })
  }
})

// @desc    Get unemployed
// @route   GET /api/employees
// @access  Private
const getUnemployed = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error ('User not found');
  }

  const unemployed = await Employee.find({ company: null });
  if (!unemployed) {
    res.status(400);
    throw new Error(`There are no unemployed`);
  }

  res.status(200).json({
    unemployed
  })

})

module.exports = {
  createEmployee,
  removeEmployee,
  addEmployee,
  getUnemployed
}