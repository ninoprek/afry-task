const express = require('express');
const router = express.Router();
const { getCompanies, setCompany, updateCompany, deleteCompany, getCompany } = require('../controllers/companyController')
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getCompanies).post(protect, setCompany);
router.route('/:id').get(getCompany).put(protect, updateCompany).delete(protect, deleteCompany);

module.exports = router;