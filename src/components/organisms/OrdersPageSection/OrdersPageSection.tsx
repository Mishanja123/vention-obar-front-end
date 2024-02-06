import styles from './OrdersPageSection.module.css';
import { Button } from '@/components/atoms';
import { useEffect, useState } from 'react';
import axiosInstance from '@/services/restaurantAPI';
import { Order } from '@/types/ordersList';
import { EmptyOrder } from '@/components/molecules';
import { useCartContext } from '@/context/cartContext';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import Swal from 'sweetalert2';

interface IDish {
  dishData: {
    id: number;
  };
  quantity: number;
}
interface IOrder {
  dishes: IDish[];
}
const OrdersPageSection = () => {
  const [allOrders, setallOrders] = useState<Order[]>([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const { addToCart } = useCartContext();

  const getUser = async () => {
    try {
      const res = await axiosInstance.get('/me');
      setUserName(res.data.user.firstName);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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

  const cancelOrder = async (id: number, status: string) => {
    try {
      await axiosInstance.patch(`/order/${id}`, { status: status });
      await getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelOrder = async (id: number, status: string) => {
    Swal.fire({
      title: `Dear ${userName}!`,
      text: 'Are you sure you want to cancel this order?',
      showCancelButton: true,
      cancelButtonText: 'Not now',
      confirmButtonColor: '#182715',
      cancelButtonColor: '#b80f0a',
      customClass: {
        popup: styles.confirmation_modal,
      },
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelOrder(id, status);
      }
      return;
    });
  };
  const repeatOrder = async ({ dishes }: IOrder) => {
    try {
      const dishObjects: { id: number; quantity: number }[] = dishes.map(
        (dish) => ({
          id: dish.dishData.id,
          quantity: dish.quantity,
        }),
      );
      for (const { id, quantity } of dishObjects) {
        for (let i = 0; i < quantity; i++) {
          await addToCart(id);
        }
      }
      navigate(PATHS.CHECKOUT);
    } catch (error) {
      console.error('An error occurred while repeating the order:', error);
    }
  };

  const handleRepeatOrder = ({ dishes }: IOrder) => {
    Swal.fire({
      title: `Dear ${userName}!`,
      text: 'Are you sure you want to repeat this order?',
      showCancelButton: true,
      cancelButtonText: 'Not now',
      confirmButtonColor: '#182715',
      cancelButtonColor: '#b80f0a',
      customClass: {
        popup: styles.confirmation_modal,
      },
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        repeatOrder({ dishes });
      }
      return;
    });
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
              <p
                className={
                  order.status === 'canceled'
                    ? styles.canceled
                    : order.status === 'completed'
                      ? styles.completed
                      : styles.active
                }>
                Status: {order.status}
              </p>
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
          <div className={styles.order_table_wrapper}>
            {order.status !== 'active' && (
              <div className={styles.order_table_comleted}></div>
            )}
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
          </div>
          {order.status === 'canceled' || order.status === 'completed' ? (
            <Button
              variant="contained"
              onClick={() => handleRepeatOrder(order)}>
              Repeat order
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => handleCancelOrder(order.id, 'canceled')}>
              Cancel order
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};
export default OrdersPageSection;
