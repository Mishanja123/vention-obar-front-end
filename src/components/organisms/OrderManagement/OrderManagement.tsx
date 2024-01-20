import { useEffect, useState } from 'react';
import axiosInstance from '@/services/restaurantAPI';
import styles from './OrderManagement.module.css';
import { Button } from '@/components/atoms';
import { title } from 'process';

interface Order {
  id: number;
  UserId: number;
  order_date: string;
  status: string;
  dishes: [];
}
/* interface EditedOrder {

} */
const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders-admin');
      const fetchedOrders: { orders: Order[] } = await response.data;

      setOrders(fetchedOrders);
    } catch (error) {
      console.log('Ooops, looks like there is an error ' + error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDeleteOrder = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/orders/${id}`);
      const data = await response.data;
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
            <td>{order.order_date}</td>
            <td>{order.status}</td>
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
