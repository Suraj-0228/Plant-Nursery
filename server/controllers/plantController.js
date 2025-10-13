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

const createPlant = async (req, res) => {
  const { name, category, price, image, careDifficulty, description } = req.body;

  try {
    const newPlant = new Plant({
      name,
      category,
      price,
      image,
      careDifficulty,
      description,
    });

    const savedPlant = await newPlant.save();
    res.status(201).json(savedPlant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a plant
// @route   PUT /api/plants/:id
// @access  Private/Admin
const updatePlant = async (req, res) => {
  const { name, category, price, image, careDifficulty, description } = req.body;

  try {
    const plant = await Plant.findById(req.params.id);

    if (plant) {
      plant.name = name || plant.name;
      plant.category = category || plant.category;
      plant.price = price || plant.price;
      plant.description = description || plant.description;
      plant.image = image || plant.image;
      plant.careDifficulty = careDifficulty || plant.careDifficulty;

      const updatedPlant = await plant.save();
      res.json(updatedPlant);
    } else {
      res.status(404).json({ message: 'Plant not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a plant
// @route   DELETE /api/plants/:id
// @access  Private/Admin
const deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (plant) {
      await plant.deleteOne();
      res.json({ message: 'Plant removed' });
    } else {
      res.status(404).json({ message: 'Plant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getPlants, getPlantsByCategory, getPlantById, createPlant, updatePlant, deletePlant };
