import { Button } from '@/components/atoms';
import styles from './OrderConfirmation.module.css';
import menuData from '@/menuData/menuData.json';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import SummaryPayment from '../SummaryPayment/SummaryPayment';

const order = menuData.slice(0, 2);

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const handleCancelClick = () => {
    Swal.fire({
      title: 'Dear First Name!',
      text: 'If you interrupt checkout process all items will return to cart. Are you sure you want to interrupt checkout process?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Yes, I'm sure",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Procced to checkout!',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`${PATHS.CHECKOUT}/${PATHS.ORDER_PAYMENT}`);
      } else {
        navigate(`${PATHS.ROOT}`);
      }
    });
  };
  return (
    <div className={styles.order_container}>
      <h3>Order No: id</h3>
      <table className={styles.order_table}>
        <tr>
          <th>Dish</th>
          <th>QTY</th>
          <th>Price</th>
        </tr>
        {order.map((dish) => (
          <tr key={dish.id}>
            <td className={styles.dish_info}>
              <img src={dish.image} alt={dish.title} />
              <h5>{dish.title}</h5>
            </td>
            <td>1</td>
            <td>{dish.price}</td>
          </tr>
        ))}
      </table>
      <div className={styles.info_container}>
        You are reserving table on MM/DD/YY at HH/MM for N guests
        <Button variant="contained" onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;