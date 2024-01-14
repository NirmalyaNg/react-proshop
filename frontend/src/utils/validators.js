import { isEmail, isPostalCode } from 'validator';

const isEmpty = (value) => value.trim().length === 0;
const hasMinLength = (value, minLength) => value.trim().length >= minLength;
const isValidEmail = (value) => isEmail(value);

const validateName = (value) => {
  let error = null;
  if (isEmpty(value)) {
    error = 'Name is required';
  } else if (!hasMinLength(value, 6)) {
    error = 'Name should have minimum 6 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error = null;
  if (isEmpty(value)) {
    error = 'Email is required';
  } else if (!isValidEmail(value)) {
    error = 'Email is invalid';
  }
  return error;
};

const validatePassword = (value) => {
  let error = null;
  if (isEmpty(value)) {
    error = 'Password is required';
  } else if (!hasMinLength(value, 6)) {
    error = 'Password should have atleast 6 characters';
  }
  return error;
};

const validateConfirmPassword = (value, passwordValue) => {
  let error = null;
  if (isEmpty(value)) {
    error = 'Confirm Password is required';
  } else if (value !== passwordValue) {
    error = 'Passwords do not match';
  }
  return error;
};

const validateAddress = (value) => {
  let error = null;
  if (isEmpty(value)) {
    error = 'Address cannot be empty';
  } else if (!hasMinLength(value, 6)) {
    error = 'Address should have atleast 6 characters';
  }
  return error;
};

const validateCity = (value) => {
  let error = null;
  if (isEmpty(value)) {
    error = 'City cannot be empty';
  }
  return error;
};

const validatePostalCode = (value) => {
  let error = null;
  if (isEmpty(value)) {
    error = 'Postal Code cannot be empty';
  } else if (!isPostalCode(value, 'any')) {
    error = 'Postal Code is invalid';
  }
  return error;
};

const validateCountry = (value) => {
  let error = null;
  if (isEmpty(value)) {
    error = 'Country cannot be empty';
  }
  return error;
};

export {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validatePostalCode,
  validateCountry,
  validateCity,
  validateAddress,
};
