import React, { useEffect, useRef, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { isEmail } from 'validator';

const LoginNew = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current?.value?.trim();
    if (enteredEmail?.length === 0) {
      setEmailError('Email is required');
    } else if (!isEmail(enteredEmail)) {
      setEmailError('Email is invalid');
    } else {
      setEmailError(null);
    }

    const enteredPassword = passwordInputRef.current?.value?.trim();
    if (enteredPassword?.length === 0) {
      setPasswordError('Password is required');
    } else if (enteredPassword?.length < 6) {
      setPasswordError('Password should have atleast 6 characters');
    } else {
      setPasswordError(null);
    }
  };

  useEffect(() => {
    if (emailError) {
      emailInputRef.current.focus();
    } else if (passwordError) {
      passwordInputRef.current.focus();
    }
  }, [emailError, passwordError]);

  return (
    <FormContainer>
      <Card className='p-3 shadow-sm border-0'>
        <Card.Body>
          <h1 className='text-center'>Sign In</h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' ref={emailInputRef} />
              {emailError && (
                <Alert className='mt-2' variant='danger'>
                  {emailError}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId='password' className='my-2'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                ref={passwordInputRef}
              />
              {passwordError && (
                <Alert className='mt-2' variant='danger'>
                  {passwordError}
                </Alert>
              )}
            </Form.Group>
            <Button type='submit' variant='dark'>
              Sign In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default LoginNew;
