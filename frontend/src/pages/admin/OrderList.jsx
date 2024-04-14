import axios from 'axios';
import React, { useState } from 'react';
import { json, useLoaderData, useParams } from 'react-router-dom';
import OrderListItem from '../../components/OrderListItem';
import { Table } from 'react-bootstrap';
import Paginate from '../../components/Paginate';

const OrderListPage = () => {
  const ordersData = useLoaderData();
  const { pageNumber } = useParams();
  const [orders, setOrders] = useState(ordersData);

  const handleMarkAsDelivered = (updatedOrder) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) =>
        order._id === updatedOrder._id
          ? { ...order, isDelivered: true, deliveredAt: updatedOrder.deliveredAt }
          : order
      );
    });
  };

  return (
    <>
      <h1>Orders</h1>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderListItem
              order={order}
              key={order._id}
              onMarkAsDelivered={handleMarkAsDelivered}
            />
          ))}
        </tbody>
      </Table>
      <Paginate page={pageNumber || 1} pages={ordersData.pages} isAdmin={true} />
    </>
  );
};

export const loader = async () => {
  try {
    const { data } = await axios.get('/api/orders');
    const { orders } = data;
    return orders;
  } catch (error) {
    throw json(
      {
        title: 'An Error Occured',
        description: error?.response?.data?.message || error.message,
      },
      { status: 500 }
    );
  }
};

export default OrderListPage;
