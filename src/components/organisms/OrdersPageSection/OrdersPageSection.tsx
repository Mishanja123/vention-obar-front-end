import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useCartContext } from '@/context/cartContext';
import { useAuth } from '@/hooks/useAuth';
import { PATHS } from '@/constants/paths';
import { IOrder, IDish, OrderStatus, OrderType } from '@/types/ordersList';

import { EmptyOrder } from '@/components/molecules';
import { Button } from '@/components/atoms';

import styles from './OrdersPageSection.module.css';
import axiosInstance from '@/services/restaurantAPI';

const OrdersPageSection = () => {
  const [allOrders, setallOrders] = useState<IOrder[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCartContext();

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
      title: `Dear ${user.firstName}!`,
      text: 'Are you sure you want to cancel this order?',
      showCancelButton: true,
      cancelButtonText: 'Not now',
      confirmButtonColor: '#182715',
      cancelButtonColor: '#d33',
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
  const repeatOrder = async (dishes: IDish[]) => {
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

  const handleRepeatOrder = (dishes: IDish[]) => {
    Swal.fire({
      title: `Dear ${user.firstName}!`,
      text: 'Are you sure you want to repeat this order?',
      showCancelButton: true,
      cancelButtonText: 'Not now',
      confirmButtonColor: '#182715',
      cancelButtonColor: '#d33',
      customClass: {
        popup: styles.confirmation_modal,
      },
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        repeatOrder(dishes);
      }
      return;
    });
  };

  const filterOrders = (orders: IOrder[]): IOrder[] => {
    const activeOrders = orders.filter(
      (order) => order.status === OrderStatus.ACTIVE,
    );
    const completedOrders = orders.filter(
      (order) => order.status === OrderStatus.COMPLETED,
    );
    const otherOrders = orders.filter(
      (order) =>
        order.status !== OrderStatus.ACTIVE &&
        order.status !== OrderStatus.COMPLETED,
    );
    return [...activeOrders, ...completedOrders, ...otherOrders];
  };

  return allOrders.length === 0 ? (
    <EmptyOrder />
  ) : (
    <ul className={styles.orders_list}>
      {filterOrders(allOrders).map((order) => (
        <li key={order.id} className={styles.orders_item}>
          <div className={styles.orders_status_wrapper}>
            <div>
              <p>Order No: {order.id}</p>
              <p
                className={
                  order.status === OrderStatus.CANCELED
                    ? styles.canceled
                    : order.status === OrderStatus.COMPLETED
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
            {order.status !== OrderStatus.ACTIVE && (
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
                        className={styles.order_img}
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
                    {order.type === OrderType.RESERVATION_WITH_PREORDER ||
                    order.type === OrderType.RESERVATION
                      ? `You reserved table for ${
                          order.orderDate.split(' ')[0]
                        } at ${order.orderDate.split(' ')[1]} for ${
                          order.guests
                        } guests`
                      : order.type === OrderType.DELIVERY
                        ? `Your order will be delivered on ${
                            order.orderDate.split(' ')[0]
                          } at ${order.orderDate.split(' ')[1]}`
                        : order.type === OrderType.TAKE_AWAY
                          ? `You can collect your order on ${
                              order.orderDate.split(' ')[0]
                            } at ${order.orderDate.split(' ')[1]}`
                          : ''}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          {order.status === OrderStatus.CANCELED ||
          order.status === OrderStatus.COMPLETED ? (
            <Button
              variant="contained"
              onClick={() => handleRepeatOrder(order.dishes)}>
              Repeat order
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => handleCancelOrder(order.id, OrderStatus.CANCELED)}>
              Cancel order
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};
export default OrdersPageSection;
