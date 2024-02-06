import styles from './OrdersPageSection.module.css';
import { Button } from '@/components/atoms';
import { useEffect, useState } from 'react';
import axiosInstance from '@/services/restaurantAPI';
import { Order } from '@/types/ordersList';
import { EmptyOrder } from '@/components/molecules';

const OrdersPageSection = () => {
  const [allOrders, setallOrders] = useState<Order[]>([]);

  const getAllOrders = async () => {
    try {
      const res = await axiosInstance.get('/orders');
      setallOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  const handleDeleteOrder = async (id: number) => {
    try {
      await axiosInstance.delete(`/order/${id}`);
      await getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRepeatOrder = async (id: number) => {
    try {
      await axiosInstance.post(`/order-repeat/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return allOrders.length === 0 ? (
    <EmptyOrder />
  ) : (
    <ul className={styles.orders_list}>
      {allOrders.map((order) => (
        <li key={order.id} className={styles.orders_item}>
          <div className={styles.orders_status_wrapper}>
            <div>
              <p>Order No: {order.id}</p>
              <p>Status: {order.status}</p>
            </div>
            <p>
              Date:{' '}
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit',
              })}
            </p>
          </div>
          <table className={styles.order_table}>
            <thead className={styles.order_table_header}>
              <tr>
                <th></th>
                <th>QTY</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {order.dishes.map((item, index) => (
                <tr key={index} className={styles.order_table_item}>
                  <td className={styles.orders_image}>
                    <img
                      width={150}
                      height={150}
                      src={item.dishData.photoPath!}
                      alt="dish"
                    />
                    <h3 className={styles.order_title}>
                      {item.dishData.title}
                    </h3>
                  </td>
                  <td className={styles.order_quantity}>{item.quantity}</td>
                  <td>{item.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  {order.type === 'reservation_with_preorder' ||
                  order.type === 'reservation'
                    ? `You reserved table for ${
                        order.orderDate.split(' ')[0]
                      } at ${order.orderDate.split(' ')[1]} for ${
                        order.guests
                      } guests`
                    : ''}
                </td>
              </tr>
            </tfoot>
          </table>
          {order.status === 'canceled' || order.status === 'completed' ? (
            <Button
              variant="contained"
              onClick={() => handleRepeatOrder(order.id)}>
              Repeat order
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => handleDeleteOrder(order.id)}>
              Cancel order
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};
export default OrdersPageSection;
