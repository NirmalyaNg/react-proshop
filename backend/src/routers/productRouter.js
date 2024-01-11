import express from 'express';
import { fetchAllProducts, fetchProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', fetchAllProducts);

router.get('/:id', fetchProduct);

export default router;
