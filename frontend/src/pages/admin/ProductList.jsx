import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Button, Col, Image, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const ProductListPage = () => {
  const productsData = useLoaderData();
  const [products, setProducts] = useState(productsData);

  const deleteHandler = (id) => {
    console.log(id);
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <LinkContainer to='/admin/new-product'>
            <Button className='btn-sm m-3' variant='dark'>
              <FaEdit /> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Table striped hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>IMAGE</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>
                <Image
                  src={product.image}
                  style={{ width: '60px', height: '60px' }}
                  rounded
                  fluid
                  alr={product.name}
                />
              </td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}`}>
                  <Button className='btn btn-sm' variant='light'>
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button
                  variant='danger'
                  className='ms-2'
                  onClick={() => deleteHandler(product._id)}
                >
                  <FaTrash style={{ color: 'white' }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductListPage;
