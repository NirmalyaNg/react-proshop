import catchAsync from '../utils/catchAsync.js';
import Order from '../models/order.js';

// @desc Create new order
// @route POST /api/orders
// @access Private
const createNewOrder = catchAsync(async (req, res, next) => {
  res.send('createOrder');
});

// @desc Get logged in user's orders
// @route GET /api/orders/myOrders
// @access Private
const getMyOrders = catchAsync(async (req, res, next) => {
  res.send('getMyOrders');
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private(admin)
const getOrderById = catchAsync(async (req, res, next) => {
  res.send('getOrderById');
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = catchAsync(async (req, res, next) => {
  res.send('updateOrderToPaid');
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private(admin)
const updateOrderToDelivered = catchAsync(async (req, res, next) => {
  res.send('updateOrderToDelivered');
});

// @desc Get All Order
// @route GET /api/orders
// @access Private(admin)
const getAllOrders = catchAsync(async (req, res, next) => {
  res.send('getAllOrders');
});

export {
  createNewOrder,
  getAllOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getMyOrders,
};
