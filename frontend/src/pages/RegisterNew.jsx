import React, { useCallback } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import useInputNew from '../hooks/useInputNew';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validators-new';

const RegisterNew = () => {
  const {
    value: nameInputValue,
    touched: nameInputTouched,
    error: nameInputError,
    handleChange: handleNameInputChange,
    handleBlur: handleNameInputBlur,
  } = useInputNew('', validateName);

  const {
    value: emailInputValue,
    touched: emailInputTouched,
    error: emailInputError,
    handleChange: handleEmailInputChange,
    handleBlur: handleEmailInputBlur,
  } = useInputNew('', validateEmail);

  const {
    value: passwordInputValue,
    touched: passwordInputTouched,
    error: passwordInputError,
    handleChange: handlePasswordInputChange,
    handleBlur: handlePasswordInputBlur,
  } = useInputNew('', validatePassword);

  const updatedConfirmPasswordValidate = useCallback(
    (value) => {
      return validateConfirmPassword(value, passwordInputValue);
    },
    [passwordInputValue]
  );

  const {
    value: confirmPasswordInputValue,
    touched: confirmPasswordInputTouched,
    error: confirmPasswordInputError,
    handleChange: handleConfirmPasswordInputChange,
    handleBlur: handleConfirmPasswordInputBlur,
  } = useInputNew('', updatedConfirmPasswordValidate);

  const isDisabled =
    nameInputError || emailInputError || passwordInputError || confirmPasswordInputError;

  return (
    <FormContainer>
      <Card className='p-3 shadow-sm border-0'>
        <Card.Body>
          <h1 className='text-center'>Register</h1>
          <Form>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={nameInputValue}
                onChange={handleNameInputChange}
                onBlur={handleNameInputBlur}
              />
              {nameInputTouched && nameInputError !== null && (
                <Alert variant='danger' className='mt-2'>
                  {nameInputError}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={emailInputValue}
                onChange={handleEmailInputChange}
                onBlur={handleEmailInputBlur}
              />
              {emailInputTouched && emailInputError !== null && (
                <Alert variant='danger' className='mt-2'>
                  {emailInputError}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId='password' className='my-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={passwordInputValue}
                onChange={handlePasswordInputChange}
                onBlur={handlePasswordInputBlur}
              />
              {passwordInputTouched && passwordInputError !== null && (
                <Alert variant='danger' className='mt-2'>
                  {passwordInputError}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='my-2'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPasswordInputValue}
                onChange={handleConfirmPasswordInputChange}
                onBlur={handleConfirmPasswordInputBlur}
              />
              {confirmPasswordInputTouched && confirmPasswordInputError !== null && (
                <Alert variant='danger' className='mt-2'>
                  {confirmPasswordInputError}
                </Alert>
              )}
            </Form.Group>
            <Button type='submit' variant='dark' disabled={isDisabled}>
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default RegisterNew;
