import { useEffect, useState } from 'react';
import axiosInstance from '@/services/restaurantAPI';
import styles from './OrderManagement.module.css';

interface Order {
  id: number;
  UserId?: number | null;
}
/* interface EditedOrder {

} */
const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders');
      const fetchedOrders: { orders: Order[] } = await response.data;
      setOrders(fetchedOrders.orders);
    } catch (error) {
      console.log('Ooops, looks like there is an error ' + error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <table className={styles.orders_table}>
      <thead>
        <tr>
          <th>No</th>
          <th>Order ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date</th>
          <th>Status</th>
          <th>Order items</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={index}>
            <td>{order.id}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderManagement;
