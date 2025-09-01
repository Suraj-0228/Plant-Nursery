const express = require('express');
const router = express.Router();
const { getPlants, getPlantsByCategory, getPlantById } = require('../controllers/plantController');

router.get('/', getPlants);
router.get('/category/:category', getPlantsByCategory);
router.get('/:id', getPlantById);

module.exports = router;
