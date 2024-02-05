import QuantityCounter from '../QuantityCounter/QuantityCounter';
import { IoTrash } from 'react-icons/io5';

import sprite from '@/assets/sprite.svg';
import styles from './CartItem.module.css';
import { IDish } from '@/types/dish';
import { useCartContext } from '@/context/cartContext';
interface CartItemProps extends IDish {
  quantity: number;
}

const CartItems = ({
  photoPath,
  title,
  price,
  quantity,
  id,
}: CartItemProps) => {
  const { removeFromCartById } = useCartContext();

  const handleRemoveFromCart = () => {
    removeFromCartById(id);
  };

  return (
    <li className={styles.cart_item_wrapper}>
      <img className={styles.cart_item_img} src={photoPath} alt="dish" />
      <div>
        <div className={styles.title_wrapper}>
          <h3 className={styles.cart_item_title}>{title}</h3>
          <p className={styles.cart_item_price}>{price}$</p>
        </div>
      </div>
      <QuantityCounter dishId={id} quantity={quantity} />
      <div
        onClick={handleRemoveFromCart}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleRemoveFromCart();
          }
        }}
        role="button"
        tabIndex={0}>
        <IoTrash className={styles.trash_icon} />
      </div>
    </li>
  );
};

export default CartItems;
