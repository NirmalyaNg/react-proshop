import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  fetchAllProducts,
  fetchProduct,
  updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(fetchAllProducts).post(protect, admin, createProduct);

router
  .route('/:id')
  .get(fetchProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.post('/:id/reviews', protect, createProductReview);

export default router;
