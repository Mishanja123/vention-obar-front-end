import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { IconContext } from 'react-icons';
import { PiShoppingCartLight } from 'react-icons/pi';
import { GoPerson } from 'react-icons/go';

import { PATHS } from '@/constants/paths';
import { scrollToReservationForm } from '@/helpers';
import { showReservationModal } from '@/helpers';
import { logout } from '@/redux/auth/operations';

import { LinkWrapper } from '@/components/atoms/index.ts';
import { Button } from '@/components/atoms/index.ts';

import styles from './Navigation.module.css';

type ILocationProp = {
  loc: string;
};

const Navigation: React.FC<ILocationProp> = ({ loc }) => {
  const location = useLocation();
  const dispatch = useDispatch<any>();

  const path = location.pathname;

  return (
    <div className={`${styles[loc]}`}>
      <LinkWrapper to={PATHS.MENU}>Menu</LinkWrapper>
      <Button
        variant="contained"
        onClick={
          path === PATHS.ROOT ? scrollToReservationForm : showReservationModal
        }>
        Reserve a table
      </Button>
      <LinkWrapper to={PATHS.ORDERS}>Orders</LinkWrapper>
      <LinkWrapper to={PATHS.CART}>
        <IconContext.Provider value={{ className: styles.cart_img }}>
          <PiShoppingCartLight />
        </IconContext.Provider>
      </LinkWrapper>
      <LinkWrapper to={PATHS.ACCOUNT}>
        <IconContext.Provider value={{ className: styles.profile_img }}>
          <GoPerson />
        </IconContext.Provider>
      </LinkWrapper>
      <Button variant="contained" onClick={() => dispatch(logout())}>
        Log out
      </Button>
    </div>
  );
};

export default Navigation;
