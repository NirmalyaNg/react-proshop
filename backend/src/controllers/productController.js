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
