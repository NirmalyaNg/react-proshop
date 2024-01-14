import catchAsync from '../utils/catchAsync.js';
import Order from '../models/order.js';
import AppError from '../utils/AppError.js';

// @desc Create new order
// @route POST /api/orders
// @access Private
const createNewOrder = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new AppError('No order items', 400));
  }
  const order = new Order({
    orderItems: orderItems.map((item) => ({
      ...item,
      _id: undefined,
      product: item._id,
    })),
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json({
    status: 'success',
    order: createdOrder,
  });
});

// @desc Get logged in user's orders
// @route GET /api/orders/myOrders
// @access Private
const getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json({
    status: 'success',
    orders,
  });
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) {
    return res.status(200).json({
      status: 'success',
      order,
    });
  } else {
    return next(new AppError('Order not found', 404));
  }
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
