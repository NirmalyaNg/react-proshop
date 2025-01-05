import { isEmail, isEmpty } from 'validator';

export const validateName = (value) => {
  if (isEmpty(value?.trim())) {
    return 'Name is required';
  }
  if (value?.trim()?.length < 6) {
    return 'Name should have atleast 6 characters';
  }
  return null;
};

export const validateEmail = (value) => {
  if (isEmpty(value?.trim())) {
    return 'Email is required';
  }
  if (!isEmail(value)) {
    return 'Email is invalid';
  }
  return null;
};

export const validatePassword = (value) => {
  if (isEmpty(value?.trim())) {
    return 'Password is required';
  }
  if (value?.trim()?.length < 6) {
    return 'Password should have atleast 6 characters';
  }
  return null;
};

export const validateConfirmPassword = (value, pwdValue) => {
  if (isEmpty(value?.trim())) {
    return 'Confirm Password is required';
  }
  if (!isEmpty(pwdValue?.trim()) && pwdValue !== value) {
    return 'Passwords do not match';
  }
  return null;
};
