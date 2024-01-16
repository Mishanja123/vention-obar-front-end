import QuantityCounter from '../QuantityCounter/QuantityCounter';
import { IoTrash } from 'react-icons/io5';

import styles from './CartItem.module.css';
import { IconContext } from 'react-icons';
// import { CartItem } from '@/models/cart.model';

type CartItemProps = {
  imageURL: string;
  title: string;
  price: number;
  quantity: number;
  // addToCart: (item: CartItem) => void;
  // removeFromCart: (item: CartItem) => void;
};

const CartItems = ({
  imageURL,
  title,
  price,
  quantity,
  // addToCart,
  // removeFromCart,
}: CartItemProps) => {
  return (
    <li className={styles.cart_item_wrapper}>
      <div className={styles.img_wrapper}>
        <svg width="200" height="200" className={styles.cart_item_image}>
          <use href={`${imageURL}#icon-avatar`} aria-expanded="true"></use>
        </svg>
        <div>
          <h3 className={styles.cart_item_title}>{title}</h3>
          <p className={styles.cart_item_price}>{price}$</p>
        </div>
      </div>
      <QuantityCounter
        quantity={quantity}
        // addToCart={addToCart}
        // removeFromCart={removeFromCart}
      />
      <IconContext.Provider value={{ className: styles.trash_icon }}>
        <IoTrash />
      </IconContext.Provider>
    </li>
  );
};

export default CartItems;
