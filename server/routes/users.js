const express = require('express');
const router = express.Router();
const { updateUserProfile, changeUserPassword, getUserProfile } = require('../controllers/userController');

router.route('/:id').get(getUserProfile).put(updateUserProfile);
router.route('/:id/password').put(changeUserPassword);

module.exports = router;
