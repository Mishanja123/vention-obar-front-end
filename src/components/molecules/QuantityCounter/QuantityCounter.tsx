import { useCartContext } from '@/context/cartContext';
import styles from './QuantityCounter.module.css';
import { CiCirclePlus } from 'react-icons/ci';
import { CiCircleMinus } from 'react-icons/ci';

type QuantityCounterProps = {
  quantity: number;
  dishId: number;
};
const QuantityCounter = ({ quantity, dishId }: QuantityCounterProps) => {
  const { updateCartItemQuantity } = useCartContext();

  const exidedMaxQuantity = quantity >= 30;
  const exidedMinQuantity = quantity <= 1;

  return (
    <div className={styles.quantity}>
      <button
        disabled={exidedMinQuantity}
        onClick={() => updateCartItemQuantity(dishId, -1)}>
        <CiCircleMinus />
      </button>
      <input
        type="text"
        className={styles.quantity_input}
        value={quantity}
        min="1"
        max="30"
        readOnly
      />

      <button
        disabled={exidedMaxQuantity}
        onClick={() => updateCartItemQuantity(dishId, 1)}>
        <CiCirclePlus />
      </button>
    </div>
  );
};

export default QuantityCounter;
