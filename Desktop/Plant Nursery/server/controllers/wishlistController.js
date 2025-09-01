const Wishlist = require('../models/Wishlist');
const User = require('../models/User');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('plants');
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add plant to wishlist
// @route   POST /api/wishlist
// @access  Private
const addToWishlist = async (req, res) => {
  const { plantId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user.id, plants: [plantId] });
      await User.findByIdAndUpdate(req.user.id, { wishlist: wishlist._id });
    } else {
      if (!wishlist.plants.includes(plantId)) {
        wishlist.plants.push(plantId);
        await wishlist.save();
      }
    }

    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove plant from wishlist
// @route   DELETE /api/wishlist/:plantId
// @access  Private
const removeFromWishlist = async (req, res) => {
  const { plantId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (wishlist) {
      wishlist.plants = wishlist.plants.filter(p => p.toString() !== plantId);
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
