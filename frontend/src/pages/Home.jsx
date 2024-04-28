import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { json, useLoaderData, useParams } from 'react-router-dom';
import { fetchProducts } from '../api/api';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomePage = () => {
  const data = useLoaderData();
  const [productsData, setProductsData] = useState(data.products);
  const [pages, setPages] = useState(data.pages);
  const { pageNumber } = useParams();
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    const fetchFiteredProducts = async () => {
      const { products, pages } = await fetchProducts(pageNumber, min, max);
      setProductsData(products);
      setPages(pages);
      setFilter(false);
    };
    if (filter) {
      fetchFiteredProducts();
    }
  }, [min, max, filter, pageNumber]);

  const handleFilter = () => {
    if (!(min || max)) return;
    setFilter(true);
  };

  return (
    <>
      <h1 className='text-center my-2'>Latest Products</h1>
      <Row className='mt-2'>
        <Col>
          <ProductCarousel />
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        <Col sm={4} md={4}>
          <Form.Control
            value={min}
            onChange={(e) => setMin(+e.target.value)}
            type='number'
            placeholder='Min. price'
            min={1}
          />
        </Col>
        <Col sm={4} md={4}>
          <Form.Control
            value={max}
            type='number'
            onChange={(e) => setMax(+e.target.value)}
            placeholder='Max. price'
            min={1}
          />
        </Col>
        <Col sm={2} md={2}>
          <Button
            onClick={handleFilter}
            type='button'
            variant='success'
            disabled={!(min || max)}>
            Filter
          </Button>
        </Col>
      </Row>
      <Row>
        {productsData.length === 0 && (
          <h2 className='mt-4 text-center'>No products Available</h2>
        )}
        {productsData.length > 0 &&
          productsData.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
      </Row>
      {pages > 0 && <Paginate page={pageNumber || 1} pages={pages} />}
    </>
  );
};

export const loader = async ({ params }) => {
  try {
    const { pageNumber } = params;
    const data = await fetchProducts(pageNumber);
    return data;
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
