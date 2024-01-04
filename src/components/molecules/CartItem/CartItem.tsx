import QuantityCounter from '../QuantityCounter/QuantityCounter';
import { IoTrash } from 'react-icons/io5';

import styles from './CartItem.module.css';
import { CartItem } from '@/models/cart.model';

type CartItemProps = {
  imageURL: string;
  title: string;
  price: number;
  quantity: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
};

const CartItems = ({
  imageURL,
  title,
  price,
  quantity,
  addToCart,
  removeFromCart,
}: CartItemProps) => {
  return (
    <li className={styles.cart_item_wrapper}>
      <svg width="200" height="200">
        <use href={`${imageURL}#icon-avatar`} aria-expanded="true"></use>
      </svg>
      <div>
        <div>
          <h3>{title}</h3>
          <p>{price}</p>
        </div>
      </div>
      <QuantityCounter
        quantity={quantity}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
      <IoTrash className={styles.trash_icon} />
    </li>
  );
};

export default CartItems;
