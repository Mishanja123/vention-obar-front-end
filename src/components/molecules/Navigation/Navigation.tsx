import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { IconContext } from 'react-icons';
import { PiShoppingCartLight } from 'react-icons/pi';
import { IoIosCart } from 'react-icons/io';
import iconHolder from '@/assets/images/avatar-icon-holder.jpeg';
import Swal from 'sweetalert2';

import { RootState, TypedDispatch } from '@/store/store';
import { logout } from '@/store/auth/operations';
import { useCartContext } from '@/context/cartContext';
import { useAuth } from '@/hooks/useAuth';
import { PATHS } from '@/constants/paths';
import { scrollToReservationForm } from '@/helpers';
import { showReservationModal } from '@/helpers';

import { LinkWrapper } from '@/components/atoms/index.ts';
import { Button } from '@/components/atoms/index.ts';

import styles from './Navigation.module.css';

type ILocationProp = {
  loc: string;
};

const Navigation: React.FC<ILocationProp> = ({ loc }) => {
  const location = useLocation();
  const dispatch = useDispatch<TypedDispatch<RootState>>();
  const { cartItems } = useCartContext();
  const { user } = useAuth();
  const userIcon = user.avatar;
  const path = location.pathname;

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#182715',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
      }
    });
  };

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
            <IoIosCart />
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
      </LinkWrapper>
      <Button variant="contained" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default Navigation;
