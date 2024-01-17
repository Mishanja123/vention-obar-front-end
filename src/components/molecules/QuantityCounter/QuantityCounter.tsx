// import { useState } from 'react';
import styles from './QuantityCounter.module.css';
import { CiCirclePlus } from 'react-icons/ci';
import { CiCircleMinus } from 'react-icons/ci';
import { CartItem } from '@/models/cart.model';
import { IconContext } from 'react-icons';

type QuantityCounterProps = {
  quantity: { quantity: number };
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
};
const QuantityCounter = ({
  quantity,
  addToCart,
  removeFromCart,
}: QuantityCounterProps) => {
  // const [currentQuantity, setQuantity] = useState(quantity);

  // const handleDecrease = () => {
  //   if (currentQuantity > 1) {
  //     setQuantity(currentQuantity - 1);
  //   }
  // };

  // const handleIncrease = () => {
  //   if (currentQuantity < 30) {
  //     setQuantity(currentQuantity + 1);
  //   }
  // };

  return (
    <div className={styles.quantity}>
      <button className={styles.counter_btn} onClick={addToCart}>
        <IconContext.Provider value={{ className: styles.counter_icon }}>
          <CiCircleMinus />
        </IconContext.Provider>
      </button>
      <input
        type="text"
        className={styles.quantity_input}
        value={quantity}
        min="1"
        max="30"
        readOnly
      />
      <button className={styles.counter_btn} onClick={removeFromCart}>
        <IconContext.Provider value={{ className: styles.counter_icon }}>
          <CiCirclePlus />
        </IconContext.Provider>
      </button>
    </div>
  );
};

export default QuantityCounter;
