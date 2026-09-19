const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    default: 0.0,
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please specify a category'],
  },
  brand: {
    type: String,
    required: false,
  },
  tags: [{
    type: String
  }],
  petType: {
    type: String,
    required: false,
  },
  stock: {
    type: Number,
    required: [true, 'Please add stock quantity'],
    default: 0,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
