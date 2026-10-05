const Brand = require('../models/Brand');

const getBrands = async (req, res) => {
  const brands = await Brand.find({});
  res.json(brands);
};

const createBrand = async (req, res) => {
  const brand = await Brand.create(req.body);
  res.status(201).json(brand);
};

module.exports = { getBrands, createBrand };
