import { CartItem, EmptyCart, SummaryPayment } from '@/components/molecules';

import sprite from '@/assets/sprite.svg';
import styles from './Cart.module.css';
import { Button } from '@/components/atoms';
import { Link } from 'react-router-dom';
import { PATHS } from '@/constants/paths';

const cartItems = [
  {
    id: '1',
    imageURL: sprite,
    title: 'Title',
    price: 600,
    quantity: 5,
  },
  {
    id: '2',
    imageURL: sprite,
    title: 'Title',
    price: 700,
    quantity: 7,
  },
  {
    id: '3',
    imageURL: sprite,
    title: 'Title',
    price: 800,
    quantity: 9,
  },
];

const Cart = () => {
  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cart_list_wrapper}>
        <button className={styles.cart_remove_all_btn}>Remove all</button>
        <ul className={styles.cart_list}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </ul>
      </div>

      <SummaryPayment quantity={20} subtotal={50} total={500}>
        <Link to={PATHS.CHECKOUT}>
          <Button variant="contained" type="button">
            Checkout
          </Button>
        </Link>
      </SummaryPayment>
    </div>
  );
};

export default Cart;
