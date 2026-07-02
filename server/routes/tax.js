const express = require('express');
const router = express.Router();
const { getTaxRate, updateTaxRate } = require('../controllers/taxController');

router.route('/')
  .get(getTaxRate)
  .put(updateTaxRate);

module.exports = router;
