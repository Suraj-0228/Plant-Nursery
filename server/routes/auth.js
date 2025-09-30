const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, deleteUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);

module.exports = router;
