import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { IconContext } from 'react-icons';
import { PiShoppingCartLight } from 'react-icons/pi';
import iconHolder from '@/assets/images/avatar-icon-holder.jpeg';

import { PATHS } from '@/constants/paths';
import { scrollToReservationForm } from '@/helpers';
import { showReservationModal } from '@/helpers';
import { logout } from '@/store/auth/operations';

import { LinkWrapper } from '@/components/atoms/index.ts';
import { Button } from '@/components/atoms/index.ts';

import styles from './Navigation.module.css';
import { RootState, TypedDispatch } from '@/store/store';
import { useCartContext } from '@/context/cartContext';
import axiosInstance from '@/services/restaurantAPI';
import { useEffect, useState } from 'react';

type ILocationProp = {
  loc: string;
};

const Navigation: React.FC<ILocationProp> = ({ loc }) => {
  const location = useLocation();
  const [userIcon, setUserIcon] = useState('');
  const dispatch = useDispatch<TypedDispatch<RootState>>();
  const { cartItems } = useCartContext();
  const path = location.pathname;
  const getUser = async () => {
    try {
      const res = await axiosInstance.get('/me');
      setUserIcon(res.data.user.avatar);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
          <div className={styles.cart_wrapper}>
            <div className={styles.cart_quantity}>
              {cartItems?.dishes?.reduce((total, item) => {
                return total + item.quantity;
              }, 0)}
            </div>
            <PiShoppingCartLight />
          </div>
        </IconContext.Provider>
      </LinkWrapper>
      <LinkWrapper to={PATHS.ACCOUNT}>
        <div className={styles.userIcon_container}>
          {userIcon ? (
            <img src={userIcon} alt="icon" />
          ) : (
            <img src={iconHolder} alt="icon" />
          )}
        </div>
        {/* <IconContext.Provider value={{ className: styles.profile_img }}>
          <GoPerson />
        </IconContext.Provider> */}
      </LinkWrapper>
      <Button variant="contained" onClick={() => dispatch(logout())}>
        Log out
      </Button>
    </div>
  );
};

export default Navigation;
