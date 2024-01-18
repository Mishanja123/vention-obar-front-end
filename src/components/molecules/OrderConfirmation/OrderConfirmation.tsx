import { Button } from '@/components/atoms';
import styles from './OrderConfirmation.module.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import { useCheckoutContext } from '@/context/checkoutContext';
import { useCartContext } from '@/context/cartContext';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const { cartItems } = useCartContext();

  const { orderData, handleDeleteOrder, tableGuests } = useCheckoutContext();
  const orderDate = orderData.order_date?.split(' ')[0] || 'MM/DD/YY';
  const orderTime = orderData.order_date?.split(' ')[1] || 'HH/MM';

  const orderInfo =
    orderData.type === 'delivery'
      ? `Your order will be delivered on ${orderDate} at ${orderTime}`
      : orderData.type === 'take_away'
        ? `Your can collect order on ${orderDate} at ${orderTime}`
        : `You are reserving table on ${orderDate} at ${orderTime} for ${tableGuests}  ${
            tableGuests === 1 ? 'guest' : 'guests'
          }`;

  const handleCancelClick = () => {
    Swal.fire({
      title: 'Dear First Name!',
      text: 'If you interrupt checkout process all items will return to cart. Are you sure you want to interrupt checkout process?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Yes, I'm sure",
      confirmButtonColor: '#182715',
      cancelButtonColor: '#182715',
      customClass: {
        popup: styles.confirmation_modal,
      },
      confirmButtonText: 'Procced to checkout!',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`${PATHS.CHECKOUT}/${PATHS.ORDER_PAYMENT}`);
      } else {
        handleDeleteOrder();
        navigate(`${PATHS.ROOT}`);
      }
    });
  };
  return (
    <div className={styles.order_container}>
      {/* <h3>Order No: id</h3> */}
      <table className={styles.order_table}>
        <thead>
          <tr>
            <th>Dish</th>
            <th>QTY</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.dishes?.map((dish) => (
            <tr key={dish.dishData.id}>
              <td className={styles.dish_info}>
                <img
                  width={200}
                  src={dish.dishData.photo_path}
                  alt={dish.dishData.title}
                />
                <h5>{dish.dishData.title}</h5>
              </td>
              <td>{dish.quantity}</td>
              <td>{dish.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.info_container}>
        <p>{orderInfo}</p>
        <Button variant="contained" onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
