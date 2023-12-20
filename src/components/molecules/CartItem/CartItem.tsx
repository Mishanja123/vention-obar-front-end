import QuantityCounter from '../QuantityCounter/QuantityCounter';
import { IoTrash } from 'react-icons/io5';

import styles from './CartItem.module.css';

type CartItemProps = {
  imageURL: string;
  title: string;
  price: number;
  quantity: number;
};

const CartItem = ({ imageURL, title, price, quantity }: CartItemProps) => {
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
      <QuantityCounter quantity={quantity} />
      <IoTrash className={styles.trash_icon} />
    </li>
  );
};

export default CartItem;
