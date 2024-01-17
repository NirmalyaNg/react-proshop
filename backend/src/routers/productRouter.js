import express from 'express';
import {
  createProduct,
  fetchAllProducts,
  fetchProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(fetchAllProducts).post(protect, admin, createProduct);

router.get('/:id', fetchProduct);

export default router;
