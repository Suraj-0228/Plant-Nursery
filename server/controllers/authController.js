const User = require('../models/User');

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

  console.log('Login attempt with:', { email, password }); // Added for debugging

  try {
    const user = await User.findOne({ email });

    console.log('User found in DB:', user); // Added for debugging

    // In a real app, you would compare the password with the hashed password
    if (user && (password === user.password)) {
      console.log('Password comparison successful'); // Added for debugging
      res.json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        // token: generateToken(user._id),
      });
    } else {
      console.log('Password comparison failed'); // Added for debugging
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error); // Added for debugging
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
      await user.remove();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, getUsers, deleteUser };
