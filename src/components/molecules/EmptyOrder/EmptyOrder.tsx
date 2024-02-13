import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/constants/paths';

import { Button } from '@/components/atoms';

import cart from '@/assets/images/cart.png';
import styles from './EmptyOrder.module.css';

const EmptyOrder = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(PATHS.MENU);
  };

  return (
    <div className={styles.empty_order_wrapper}>
      <img src={cart} alt="cart" width={300} />
      <h2>Ooops! It's empty here </h2>
      <Button onClick={handleButtonClick} type="button" variant="contained">
        <p>Go to Menu</p>
      </Button>
    </div>
  );
};

export default EmptyOrder;
