import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { IconContext } from 'react-icons';
import { PiShoppingCartLight } from 'react-icons/pi';
import { GoPerson } from 'react-icons/go';

import { PATHS } from '@/constants/paths';
import { useAuthContext } from '@/context/authContext';

import { ReservationForm } from '@/components/molecules';
import { LinkWrapper } from '@/components/atoms/index.ts';
import { Button } from '@/components/atoms/index.ts';
import { scrollToReservationForm } from '@/helpers/scrollToReservation.ts';

import styles from './Navigation.module.css';

const Navigation = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const location = useLocation();
  const path = location.pathname;
  const mySwal = withReactContent(Swal);

  const { logOut } = useAuthContext();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showReservationModal = () =>
    mySwal.fire({
      title: 'Make a reservation',
      html: <ReservationForm />,
      confirmButtonText: 'Close',
    });

  return (
    <>
      <LinkWrapper to={PATHS.MENU}>Menu</LinkWrapper>
      {windowWidth >= 876 && (
        <Button
          variant="contained"
          onClick={
            path === PATHS.ROOT ? scrollToReservationForm : showReservationModal
          }>
          Reserve a table
        </Button>
      )}
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
      {windowWidth >= 876 && (
        <Button variant="contained" onClick={() => logOut()}>
          Log out
        </Button>
      )}
    </>
  );
};

export default Navigation;
