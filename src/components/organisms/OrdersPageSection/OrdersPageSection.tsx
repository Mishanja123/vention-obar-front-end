import styles from './OrdersPageSection.module.css';

import sprite from '@/assets/sprite.svg';

const orders = [
  {
    id: 1,
    guests: 2,

    status: 'Active, Paid / or Will be pay on the spot',
    orderNumber: 101,
    orderDate: new Date().toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }),
    orderTime: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    cart: [
      {
        guests: 2,
        dishURL: sprite,
        quantity: 5,
        title: 'Soup',
        price: 400,
      },
    ],
  },
  {
    id: 2,
    guests: 2,

    status: 'Cancelled',
    orderNumber: 102,
    orderDate: new Date().toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }),
    orderTime: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    cart: [
      {
        guests: 2,
        dishURL: sprite,
        quantity: 5,
        title: 'Eggs',
        price: 400,
      },
    ],
  },
  {
    id: 3,
    guests: 2,

    status: 'Completed',
    orderNumber: 103,
    orderDate: new Date().toLocaleDateString('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    }),
    orderTime: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    cart: [
      {
        guests: 2,
        dishURL: sprite,
        quantity: 5,
        title: 'Soup',
        price: 400,
      },
      {
        guests: 2,
        dishURL: sprite,
        quantity: 5,
        title: 'Steak',
        price: 400,
      },
    ],
  },
];

const OrdersPageSection = () => {
  return (
    <ul className={styles.orders_list}>
      {orders.map((order) => (
        <li key={order.id} className={styles.orders_item}>
          <div className={styles.orders_status_wrapper}>
            <div>
              <p>Order No: {order.orderNumber}</p>
              <p>Status: {order.status}</p>
            </div>
            <p>Date: {order.orderDate}</p>
          </div>
          <table className={styles.order_table}>
            <thead className={styles.order_table_header}>
              <tr >
                <th></th>
                <th>QTY</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className={styles.table_body}>
              {order.cart.map((item, index, cart) => (
                <tr key={index} className={styles.order_table_item}>
                  <td className={styles.orders_image}>
                    <svg width="150" height="150">
                      <use
                        href={`${item.dishURL}#icon-avatar`}
                        aria-expanded="true"
                      ></use>
                    </svg>
                    <h3>{item.title}</h3>
                  </td>
                  <td>{cart.length}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot >{`You reserved table for ${order.orderDate} at ${order.orderTime} for ${order.guests} guests`}</tfoot>
          </table>
        </li>
      ))}
    </ul>
  );
};
export default OrdersPageSection;
