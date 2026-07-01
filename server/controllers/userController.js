const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Update user profile
// @route   PUT /api/users/:id
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.fullname = req.body.fullName !== undefined ? req.body.fullName : user.fullname;
    user.email = req.body.email !== undefined ? req.body.email : user.email;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
    if (req.body.address) {
        user.address = {
            street: req.body.address.street !== undefined ? req.body.address.street : user.address.street,
            city: req.body.address.city !== undefined ? req.body.address.city : user.address.city,
            state: req.body.address.state !== undefined ? req.body.address.state : user.address.state,
            zip: req.body.address.zip !== undefined ? req.body.address.zip : user.address.zip,
            country: req.body.address.country !== undefined ? req.body.address.country : user.address.country,
        };
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      username: updatedUser.username,
      isAdmin: updatedUser.isAdmin,
      phone: updatedUser.phone,
      address: updatedUser.address,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Change user password
// @route   PUT /api/users/:id/password
// @access  Private
const changeUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile details
// @route   GET /api/users/:id
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        phone: user.phone || '',
        address: user.address || {}
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateUserProfile, changeUserPassword, getUserProfile };
