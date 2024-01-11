import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
import { json, useLoaderData } from 'react-router-dom';

const HomePage = () => {
  const products = useLoaderData();
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export const loader = async () => {
  try {
    const { data } = await axios.get('/api/products');
    return data.products;
  } catch (error) {
    throw json(
      {
        title: 'Failed to fetch Products',
        description: 'There was an error fetching products',
      },
      {
        status: 500,
      }
    );
  }
};

export default HomePage;
