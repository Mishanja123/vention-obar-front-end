import { CartItem, EmptyCart } from '@/components/molecules';

import sprite from '@/assets/sprite.svg';
import styles from './Cart.module.css';

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
      <button>Remove all</button>
      <ul className={styles.cart_list}>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default Cart;
