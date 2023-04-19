const express = require('express');
const router = express.Router();
const { getCompanies, setCompany, updateCompany, deleteCompany } = require('../controllers/companyController')
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getCompanies).post(protect, setCompany);
router.route('/:id').put(protect, updateCompany).delete(protect, deleteCompany);

module.exports = router;