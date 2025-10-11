const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/userController');

router.route('/:id').put(updateUserProfile);

module.exports = router;
