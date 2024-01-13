import { isEmail } from 'validator';

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

export { validateName, validateEmail, validatePassword, validateConfirmPassword };
