import { CiCirclePlus } from 'react-icons/ci';
import { CiCircleMinus } from 'react-icons/ci';
import Swal from 'sweetalert2';

import { useCartContext } from '@/context/cartContext';

import styles from './QuantityCounter.module.css';

type QuantityCounterProps = {
  quantity: number;
  dishId: number;
};

const QuantityCounter = ({ quantity, dishId }: QuantityCounterProps) => {
  const { updateCartItemQuantity, removeFromCartById } = useCartContext();

  const exidedMaxQuantity = quantity >= 30;
  const handleRemoveFromCart = () => {
    if (quantity > 1) {
      updateCartItemQuantity(dishId, -1);
    } else {
      removeFromCartById(dishId);
    }
  };

  const handleDecrease = () => {
    if (!exidedMaxQuantity) {
      handleRemoveFromCart();
      Swal.fire({
        icon: 'success',
        title: 'Portion Decreased!',
        showConfirmButton: false,
        position: 'top-end',
        timer: 1500,
        toast: true,
        customClass: {
          popup: 'swal2-toast',
          title: 'swal2-toast-title',
        },
      });
    }
  };

  const handleIncrease = () => {
    if (!exidedMaxQuantity) {
      updateCartItemQuantity(dishId, 1);
      Swal.fire({
        icon: 'success',
        title: 'Portion Increased!',
        showConfirmButton: false,
        position: 'top-end',
        timer: 1500,
        toast: true,
        customClass: {
          popup: 'swal2-toast',
          title: 'swal2-toast-title',
        },
      });
    }
  };

  return (
    <div className={styles.quantity}>
      <button onClick={handleDecrease}>
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
      <button disabled={exidedMaxQuantity} onClick={handleIncrease}>
        <CiCirclePlus />
      </button>
    </div>
  );
};

export default QuantityCounter;
