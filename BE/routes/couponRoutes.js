const express = require('express');
const router = express.Router();
const { checkCoupon, createCoupon } = require('../controllers/couponController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, admin, createCoupon);
router.route('/:code').get(checkCoupon);

module.exports = router;
