import { useState } from 'react';
import styles from './QuantityCounter.module.css';
import { CiCirclePlus } from 'react-icons/ci';
import { CiCircleMinus } from 'react-icons/ci';

const QuantityCounter = ({ quantity }: { quantity: number }) => {
  const [currentQuantity, setQuantity] = useState(quantity);

  const handleDecrease = () => {
    if (currentQuantity > 1) {
      setQuantity(currentQuantity - 1);
    }
  };

  const handleIncrease = () => {
    if (currentQuantity < 30) {
      setQuantity(currentQuantity + 1);
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
        value={currentQuantity}
        min="1"
        max="30"
        readOnly
      />
      <button onClick={handleIncrease}>
        <CiCirclePlus />
      </button>
    </div>
  );
};

export default QuantityCounter;
