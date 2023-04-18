const express = require('express');
const router = express.Router();
const { getCompanies, setCompany, updateCompany, deleteCompany } = require('../controllers/companiesController')

router.route('/').get(getCompanies).post(setCompany);
router.route('/:id').put(updateCompany).delete(deleteCompany);

module.exports = router;