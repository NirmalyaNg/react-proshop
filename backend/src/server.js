import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/db.js';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import AppError from './utils/AppError.js';
import globalErrorHandler from './controllers/errorController.js';

// Configure dotenv
dotenv.config();

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

// Register body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register cookie parser middleware
app.use(cookieParser());

// Register routers
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) =>
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  })
);

// Handle error routes
app.all('*', (req, res, next) => {
  const appError = new AppError(`Cannot find ${req.originalUrl} on the server.`, 404);
  next(appError);
});

// Global Error Moddleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
