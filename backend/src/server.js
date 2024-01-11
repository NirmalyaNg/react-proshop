import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import productRouter from './routers/productRouter.js';
import AppError from './utils/AppError.js';
import globalErrorHandler from './controllers/errorController.js';

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use('/api/products', productRouter);

app.all('*', (req, res, next) => {
  const appError = new AppError(`Cannot find ${req.originalUrl} on the server.`, 404);
  next(appError);
});

// Global Error Moddleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
