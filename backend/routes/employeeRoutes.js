const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createEmployee, removeEmployee, getUnemployed, addEmployee } = require('../controllers/employeeController');

router.route('/').post(protect, createEmployee)
router.route('/remove').put(protect, removeEmployee);
router.route('/add').put(protect, addEmployee);
router.route('/unemployed').get(protect, getUnemployed);

module.exports = router;