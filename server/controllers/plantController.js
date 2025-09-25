const Plant = require('../models/Plant');

// @desc    Fetch all plants
// @route   GET /api/plants
// @access  Public
const getPlants = async (req, res) => {
  try {
    const plants = await Plant.find({});
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch plants by category
// @route   GET /api/plants/category/:category
// @access  Public
const getPlantsByCategory = async (req, res) => {
  try {
    const plants = await Plant.find({ category: req.params.category });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Fetch single plant
// @route   GET /api/plants/:id
// @access  Public
const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (plant) {
      res.json(plant);
    } else {
      res.status(404).json({ message: 'Plant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPlants, getPlantsByCategory, getPlantById };
