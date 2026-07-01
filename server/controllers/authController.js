const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { fullname, email, username, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      fullname,
      email,
      username,
      password, // In a real app, you should hash the password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        // token: generateToken(user._id), // You would generate a token here
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt with:', { email }); // Log without password for security

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.isBlocked) {
        return res.status(403).json({ message: 'Your account has been blocked by an administrator' });
      }
      console.log('Password comparison successful');
      res.json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      });
    } else {
      console.log('Password comparison failed');
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user
// @route   DELETE /api/auth/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.fullname = req.body.fullname || user.fullname;
      user.email = req.body.email || user.email;
      user.username = req.body.username || user.username;
      user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
      user.isBlocked = req.body.isBlocked !== undefined ? req.body.isBlocked : user.isBlocked;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        username: updatedUser.username,
        isAdmin: updatedUser.isAdmin,
        isBlocked: updatedUser.isBlocked,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, getUsers, deleteUser, updateUser };