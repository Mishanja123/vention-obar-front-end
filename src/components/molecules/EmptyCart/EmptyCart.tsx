import sprite from '@/assets/sprite.svg';
import styles from './EmptyCart.module.css';

import { Button } from '@/components/atoms';

import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(PATHS.MENU);
  };

  return (
    <div className={styles.empty_cart_wrapper}>
      <svg width="150" height="150" style={{ transform: 'rotate(45deg)' }}>
        <use href={`${sprite}#icon-avatar`} aria-expanded="true"></use>
      </svg>
      <h2>Ooops! Your cart is empty </h2>
      <p>Some funny text</p>
      <Button onClick={handleButtonClick} type="button" variant="contained">
        <p>Go to Menu</p>
      </Button>
    </div>
  );
};

export default EmptyCart;
