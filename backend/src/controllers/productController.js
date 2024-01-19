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
  const { name, price, brand, category, countInStock, description, image } = req.body;
  if (!name || !price || !brand || !category || !countInStock || !description || !image) {
    return next(new AppError('All fields are required', 400));
  }
  const product = new Product({
    name,
    price,
    user: req.user._id,
    image,
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

// @desc Update Product
// Route PUT /api/products/:id
// Access private(admin)
export const updateProduct = catchAsync(async (req, res, next) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  if (!name || !price || !brand || !category || !countInStock || !description || !image) {
    return next(new AppError('All fields are required', 400));
  }
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.brand = brand;
    product.description = description;
    product.image = image;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json({
      status: 'success',
      product: updatedProduct,
    });
  } else {
    return next(new AppError('Product not found', 404));
  }
});

// @desc Delete Product
// Route DELETE /api/products/:id
// Access private(admin)
export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({
      status: 'success',
      message: 'Deleted Successfully',
    });
  } else {
    return next(new AppError('Product not found', 404));
  }
});
