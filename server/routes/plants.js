const express = require('express');
const router = express.Router();
const { getPlants, getPlantsByCategory, getPlantById, createPlant, updatePlant, deletePlant } = require('../controllers/plantController');

router.get('/', getPlants);
router.get('/category/:category', getPlantsByCategory);
router.get('/:id', getPlantById);
router.post('/', createPlant);
router.put('/:id', updatePlant);
router.delete('/:id', deletePlant);

module.exports = router;
