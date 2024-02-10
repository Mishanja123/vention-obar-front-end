import QuantityCounter from '../QuantityCounter/QuantityCounter';
import { IoTrash } from 'react-icons/io5';

import styles from './CartItem.module.css';
import { useCartContext } from '@/context/cartContext';
interface CartItemProps {
  id: number;
  photoPath: string;
  title: string;
  price: string;
  quantity: number;
}

const CartItems = (props: CartItemProps) => {
  const { photoPath, title, price, quantity, id } = props;
  const { removeFromCartById } = useCartContext();

  const handleRemoveFromCart = () => {
    removeFromCartById(id);
  };

  return (
    <li className={styles.cart_item_wrapper}>
      <img src={photoPath} className={styles.cart_item_image} alt="dish" />
      <div className={styles.title_wrapper}>
        <h3 className={styles.cart_item_title}>{title}</h3>
        <p className={styles.cart_item_price}>{price}$</p>
      </div>
      <QuantityCounter dishId={id} quantity={quantity} />
      <div
        data-testid="1"
        onClick={handleRemoveFromCart}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleRemoveFromCart();
          }
        }}
        role="button"
        tabIndex={0}>
        <IoTrash name="trash" className={styles.trash_icon} />
      </div>
    </li>
  );
};

export default CartItems;
