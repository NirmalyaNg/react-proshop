import catchAsync from '../utils/catchAsync.js';
import Product from '../models/product.js';
import AppError from '../utils/AppError.js';

// @desc Fetch All Products
// Route GET /api/products
// Access public
export const fetchAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({
    status: 'success',
    count: products.length,
    products,
  });
});

// @desc Fetch Single Product
// Route GET /api/products/:id
// Access public
export const fetchProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }
  res.status(200).json({
    status: 'success',
    product,
  });
});

// @desc Create Product
// Route POST /api/products
// Access private(admin)
export const createProduct = catchAsync(async (req, res, next) => {
  const { name, price, brand, category, countInStock, description } = req.body;
  if (!name || !price || !brand || !category || !countInStock || !description) {
    return next(new AppError('All fields are required', 400));
  }
  const product = new Product({
    name,
    price,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand,
    category,
    countInStock,
    numReviews: 0,
    description,
  });
  const createdProduct = await product.save();
  res.status(201).json({
    status: 'success',
    product: createdProduct,
  });
});
