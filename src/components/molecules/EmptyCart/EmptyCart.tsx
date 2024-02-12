import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/constants/paths';

import { Button } from '@/components/atoms';

import cart from '@/assets/images/cart.png';
import styles from './EmptyCart.module.css';

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(PATHS.MENU);
  };

  return (
    <div className={styles.empty_cart_wrapper}>
      <img src={cart} alt="cart" width={300} />
      <h2>Ooops! Your cart is empty </h2>
      <p className={styles.empty_cart_text}>
        Uh-oh! Your cart is feeling a bit lonely—time to fill it up with goodies
        and turn those empty cart blues into a shopping spree symphony!
      </p>
      <Button onClick={handleButtonClick} type="button" variant="contained">
        <p>Go to Menu</p>
      </Button>
    </div>
  );
};

export default EmptyCart;
