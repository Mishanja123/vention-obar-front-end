import { useEffect, useState } from 'react';

import axiosInstance from '@/services/restaurantAPI';
import { IOrder, OrderStatus } from '@/types/ordersList';

import { Button } from '@/components/atoms';

import styles from './OrderManagement.module.css';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders-admin');
      const fetchedOrders: { orders: IOrder[] } = await response.data;
      // @ts-expect-error unknown
      setOrders(fetchedOrders);
    } catch (error) {
      console.log('Ooops, looks like there is an error ' + error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCompleteOrder = async (id: number, status: string) => {
    try {
      await axiosInstance.patch(`/order/${id}`, { status: status });
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelOrder = async (id: number, status: string) => {
    try {
      await axiosInstance.patch(`/order/${id}`, { status: status });
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteOrder = async (id: number) => {
    try {
      await axiosInstance.delete(`/order/${id}`);
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <table className={styles.orders_table}>
      <thead>
        <tr>
          <th>No</th>
          <th>Order ID</th>
          <th>User ID</th>
          <th>Date</th>
          <th>Status</th>
          <th>Order items</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{order.id}</td>
            <td>{order.UserId}</td>
            <td>{order.orderDate}</td>
            <td
              className={
                order.status === OrderStatus.CANCELED
                  ? styles.canceled
                  : order.status === OrderStatus.ACTIVE
                    ? styles.active
                    : styles.completed
              }>
              {order.status}
            </td>
            <td>
              {order.dishes.map((dish) => (
                <p key={dish.dishData.id}>
                  {dish.dishData.title}

                  <span> ({dish.quantity})</span>
                </p>
              ))}
            </td>
            <td>
              <Button
                variant="outlined"
                onClick={() =>
                  handleCompleteOrder(order.id, OrderStatus.COMPLETED)
                }>
                Complate
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  handleCancelOrder(order.id, OrderStatus.CANCELED)
                }>
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleDeleteOrder(order.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderManagement;
