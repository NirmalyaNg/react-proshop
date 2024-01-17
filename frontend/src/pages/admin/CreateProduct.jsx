import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import useInput from '../../hooks/useInput';
import {
  validateProductBrand,
  validateProductCategory,
  validateProductCountInStock,
  validateProductDescription,
  validateProductName,
  validateProductPrice,
} from '../../utils/validators';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProductPage = () => {
  const {
    value: name,
    handleChange: nameChangeHandler,
    handleBlur: nameBlurHandler,
    inValid: nameIsInvalid,
    error: nameError,
  } = useInput('', validateProductName);
  const {
    value: category,
    handleChange: categoryChangeHandler,
    handleBlur: categoryBlurHandler,
    inValid: categoryIsInvalid,
    error: categoryError,
  } = useInput('', validateProductCategory);
  const {
    value: brand,
    handleChange: brandChangeHandler,
    handleBlur: brandBlurHandler,
    inValid: brandIsInvalid,
    error: brandError,
  } = useInput('', validateProductBrand);
  const {
    value: description,
    handleChange: descriptionChangeHandler,
    handleBlur: descriptionBlurHandler,
    inValid: descriptionIsInvalid,
    error: descriptionError,
  } = useInput('', validateProductDescription);
  const {
    value: countInStock,
    handleChange: countInStockChangeHandler,
    handleBlur: countInStockBlurHandler,
    inValid: countInStockIsInvalid,
    error: countInStockError,
  } = useInput('', validateProductCountInStock);
  const {
    value: price,
    handleChange: priceChangeHandler,
    handleBlur: priceBlurHandler,
    inValid: priceIsInvalid,
    error: priceError,
  } = useInput('', validateProductPrice);

  const formIsInvalid =
    nameError ||
    descriptionError ||
    categoryError ||
    countInStockError ||
    brandError ||
    priceError;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formIsInvalid || loading) return;

    setLoading(true);
    try {
      await axios.post('/api/products', {
        name,
        description,
        brand,
        price,
        category,
        countInStock,
      });
      navigate('/admin/product-list');
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
    }
    setLoading(false);
  };
  return (
    <Row className='justify-content-center'>
      <Col md={6}>
        <h2 className='text-center'>New Product</h2>
        <Card className='shadow-sm p-3 border-0' onSubmit={handleSubmit}>
          <Card.Body>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            <Form>
              <Form.Group controlId='name' className='mb-2'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  value={name}
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  placeholder='Product Name'
                />
                {nameIsInvalid && <p className='text-danger'>{nameError}</p>}
              </Form.Group>
              <Form.Group controlId='category' className='mb-2'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  value={category}
                  onChange={categoryChangeHandler}
                  onBlur={categoryBlurHandler}
                  placeholder='Product Category'
                />
                {categoryIsInvalid && <p className='text-danger'>{categoryError}</p>}
              </Form.Group>
              <Form.Group controlId='brand' className='mb-2'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  value={brand}
                  onChange={brandChangeHandler}
                  onBlur={brandBlurHandler}
                  placeholder='Product Brand'
                />
                {brandIsInvalid && <p className='text-danger'>{brandError}</p>}
              </Form.Group>
              <Form.Group controlId='description' className='mb-2'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  placeholder='Product Description'
                  style={{ resize: ' none' }}
                  value={description}
                  onChange={descriptionChangeHandler}
                  onBlur={descriptionBlurHandler}
                />
                {descriptionIsInvalid && <p className='text-danger'>{descriptionError}</p>}
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group controlId='price'>
                    <Form.Label>Price ($)</Form.Label>
                    <Form.Control
                      type='number'
                      value={price}
                      onChange={priceChangeHandler}
                      onBlur={priceBlurHandler}
                      min={0}
                      placeholder='Product Price'
                    />
                    {priceIsInvalid && <p className='text-danger'>{priceError}</p>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                      type='number'
                      value={countInStock}
                      onChange={countInStockChangeHandler}
                      onBlur={countInStockBlurHandler}
                      min={0}
                      placeholder='Count in Stock'
                    />
                    {countInStockIsInvalid && (
                      <p className='text-danger'>{countInStockError}</p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Button
                type='submit'
                className='mt-2'
                variant='dark'
                disabled={formIsInvalid || loading}
              >
                Add Product
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateProductPage;
