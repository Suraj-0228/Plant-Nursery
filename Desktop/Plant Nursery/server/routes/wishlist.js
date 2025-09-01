const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');

// For now, we are not protecting the routes. We will add auth middleware later.
// const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getWishlist).post(addToWishlist);
router.route('/:plantId').delete(removeFromWishlist);

module.exports = router;
