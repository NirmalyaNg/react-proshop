import axios from 'axios';
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { json, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderListPage = () => {
  const ordersData = useLoaderData();
  const [orders, setOrders] = useState(ordersData);
  const [loading, setLoading] = useState(false);

  const handleMarkAsDelivered = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`/api/orders/${id}/deliver`);
      const { order: updatedOrder } = data;
      setOrders((prevOrders) => {
        return prevOrders.map((order) =>
          order._id === updatedOrder._id
            ? { ...order, isDelivered: true, deliveredAt: updatedOrder.deliveredAt }
            : order
        );
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setLoading(false);
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
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
              <td>{new Date(order.createdAt).toDateString()}</td>
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>
                {order.isPaid ? (
                  new Date(order.paidAt).toDateString()
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  new Date(order.deliveredAt).toDateString()
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button variant='dark' className='btn-sm' type='button'>
                    Details
                  </Button>
                </LinkContainer>
                {!order.isDelivered && order.isPaid && (
                  <Button
                    variant='warning'
                    className='btn-sm ms-2'
                    type='button'
                    onClick={() => handleMarkAsDelivered(order._id)}
                    disabled={loading}
                  >
                    Mark Delivered
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
