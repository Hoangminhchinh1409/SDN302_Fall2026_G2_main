const Coupon = require('../models/Coupon');

const checkCoupon = async (req, res) => {
  const { code } = req.params;
  const coupon = await Coupon.findOne({ code, isActive: true });
  
  if (coupon && coupon.expiryDate > Date.now()) {
    res.json(coupon);
  } else {
    res.status(404).json({ message: 'Coupon not valid' });
  }
};

const createCoupon = async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json(coupon);
};

module.exports = { checkCoupon, createCoupon };
