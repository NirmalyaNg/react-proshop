import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, FormControl, Image, ListGroup, Row } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [checkboxState, setCheckboxState] = useState([]);
  const dispatch = useDispatch();

  const handleAddToCart = async (product, value) => {
    dispatch(
      addToCart({
        ...product,
        qty: value,
      })
    );
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    setCheckboxState((prev) => {
      return prev.filter((id) => cartItems.findIndex((item) => item._id === id) !== -1);
    });
  }, [cartItems]);

  const handleCheckboxStateChange = (e, id) => {
    let checkedStateCpy = [...checkboxState];
    if (id === 'all') {
      if (!e.target.checked) {
        checkedStateCpy = [];
      } else {
        if (checkedStateCpy.length !== cartItems?.length) {
          cartItems?.forEach((item) => {
            if (!checkedStateCpy.includes(item._id)) {
              checkedStateCpy.push(item._id);
            }
          });
        }
      }
    } else if (checkedStateCpy.findIndex((item) => item === id) === -1) {
      checkedStateCpy.push(id);
    } else {
      checkedStateCpy = checkedStateCpy.filter((item) => item !== id);
    }
    setCheckboxState(checkedStateCpy);
  };

  const handleBulkRemove = () => {
    dispatch(removeFromCart(checkboxState));
  };

  const handleProceedToCheckout = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty.{' '}
            <Link to='/'>
              <strong>Go Back</strong>
            </Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col md={1}>
                  <Form.Check
                    checked={checkboxState.length === cartItems?.length}
                    onChange={(e) => handleCheckboxStateChange(e, 'all')}
                  />
                </Col>
                <Col md={1}>
                  <Button
                    type='button'
                    variant='light'
                    onClick={handleBulkRemove}
                    disabled={checkboxState?.length === 0}>
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            {cartItems.map((cartItem) => (
              <ListGroup.Item key={cartItem._id}>
                <Row>
                  <Col md={1}>
                    <Form.Check
                      checked={checkboxState.includes(cartItem._id)}
                      onChange={(e) => handleCheckboxStateChange(e, cartItem._id)}
                    />
                  </Col>
                  <Col md={2}>
                    <Image src={cartItem.image} alt={cartItem.name} rounded fluid />
                  </Col>
                  <Col md={2}>
                    <Link to={`/product/${cartItem._id}`}>{cartItem.name}</Link>
                  </Col>
                  <Col md={2}>${cartItem.price}</Col>
                  <Col md={2}>
                    <FormControl
                      as='select'
                      value={cartItem.qty}
                      onChange={(e) => handleAddToCart(cartItem, Number(e.target.value))}>
                      {[...Array(cartItem.countInStock).keys()].map((qty) => (
                        <option key={qty + 1}>{qty + 1}</option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => handleRemoveFromCart(cartItem._id)}>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      {cartItems.length > 0 && (
        <Col md={4}>
          <Card className='p-3 shadow-sm border-0'>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-dark btn-block'
                  disabled={cartItems.length === 0}
                  onClick={handleProceedToCheckout}>
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default CartPage;
