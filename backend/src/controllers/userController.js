import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/user.js';
import AppError from '../utils/AppError.js';

// @desc Authenticate user and generate token
// @route POST /api/users/login
// @access public
const authUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1 hour',
    });

    // Add token a http-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1hour
    });

    return res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } else {
    return next(new AppError('Invalid email or password', 401));
  }
});

// @desc Register user
// @route POST /api/users
// @access public
const registerUser = catchAsync(async (req, res) => {
  res.send('Register User');
});

// @desc Logout user and clear cookie
// @route POST /api/users/logout
// @access private
const logoutUser = catchAsync(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access private
const getUserProfile = catchAsync(async (req, res) => {
  res.send('Get User Profile');
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access private
const updateUserProfile = catchAsync(async (req, res) => {
  res.send('Update User Profile');
});

// @desc Get users
// @route GET /api/users
// @access private(admin)
const getUsers = catchAsync(async (req, res) => {
  res.send('Get Users');
});

// @desc Get user by id
// @route GET /api/users/:id
// @access private(admin)
const getUserById = catchAsync(async (req, res) => {
  res.send('Get User By Id');
});

// @desc Delete user by id
// @route DELETE /api/users/:id
// @access private(admin)
const deleteUserById = catchAsync(async (req, res) => {
  res.send('Delete User By Id');
});

// @desc Update User By Id
// @route PUT /api/users/:id
// @access private(admin)

const updateUserById = catchAsync(async (req, res) => {
  res.send('Update User By Id');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
