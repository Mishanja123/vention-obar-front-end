import { orders } from '@/content/ordersData/orders';
import styles from './OrdersPageSection.module.css';

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
              <tr>
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
                        aria-expanded="true"></use>
                    </svg>
                    <h3>{item.title}</h3>
                  </td>
                  <td>{cart.length}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <p>
                {`You reserved table for ${order.orderDate} at ${order.orderTime} for ${order.guests} guests`}
              </p>
            </tfoot>
          </table>
        </li>
      ))}
    </ul>
  );
};
export default OrdersPageSection;
