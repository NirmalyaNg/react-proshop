import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <FormContainer>
      <Card className='p-3 shadow-sm border-0'>
        <Card.Body>
          <h1 className='text-center'>Sign In</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-3'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-2'>
              Sign In
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              New Customer ?{' '}
              <Link to='/register'>
                <strong>Register</strong>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default LoginPage;
