import React, { useState } from 'react';
import { Link, json, useLoaderData } from 'react-router-dom';
import { Button, Card, Col, FormControl, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

function ProductDetailPage() {
  const [qty, setQty] = useState(1);
  const product = useLoaderData();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        qty,
      })
    );
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <FormControl
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((qty) => (
                          <option key={qty + 1}>{qty + 1}</option>
                        ))}
                      </FormControl>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className='btn-block btn-dark'
                  type='button'
                  disabled={product.countInStock === 0}
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export const loader = async ({ params }) => {
  try {
    const { id: productId } = params;
    const { data } = await axios.get(`/api/products/${productId}`);
    return data.product;
  } catch (error) {
    throw json(
      {
        title: 'Invalid Product',
        description: 'Product cannot be found',
      },
      {
        status: 500,
      }
    );
  }
};

export default ProductDetailPage;
