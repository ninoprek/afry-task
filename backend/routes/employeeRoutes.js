const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createEmployee } = require('../controllers/employeeController');

router.route('/').post(protect, createEmployee);

module.exports = router;