import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PiShoppingCartLight } from 'react-icons/pi';
import { GoPerson } from 'react-icons/go';
import { IconContext } from 'react-icons';
import { IoMenu } from 'react-icons/io5';
import homeLogo from '@/assets/images/homeLogo.svg';

import { SearchInput } from '@/components/atoms/index.ts';
import { PATHS } from '@/constants/paths';
import styles from './Header.module.css';
import { Button } from '@/components/atoms/index.ts';
import { scrollToReservationForm } from '@/helpers/scrollToReservation.ts';
import { MobileMenu, ReservationForm } from '@/components/molecules';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuthContext } from '@/context/authContext';
import { LinkWrapper } from '@/components/atoms/index.ts';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const location = useLocation();
  const path = location.pathname;
  const { logOut } = useAuthContext();

  const mySwal = withReactContent(Swal);

  const showReservationModal = () =>
    mySwal.fire({
      title: 'Make a reservation',
      html: <ReservationForm />,
      confirmButtonText: 'Close',
    });

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div className={styles.header_wrapper}>
      <button className={styles.menuBtn} type="button" onClick={openMenu}>
        <IconContext.Provider value={{ className: styles.openMenuBtn }}>
          <IoMenu />
        </IconContext.Provider>
      </button>
      <NavLink to={PATHS.ROOT} className={styles.logo_link}>
        <img
          src={homeLogo}
          alt="logo"
          width={120}
          height={60}
          style={{ borderRadius: 20 }}
        />
      </NavLink>
      <SearchInput />
      <div className={styles.navWrapper}>
        <LinkWrapper to={PATHS.MENU}>Menu</LinkWrapper>
        {windowWidth >= 876 && (
          <Button
            variant="contained"
            onClick={
              path === PATHS.ROOT
                ? scrollToReservationForm
                : showReservationModal
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
      </div>

      {isMenuOpen && <MobileMenu onClose={closeMenu} isMenuOpen={isMenuOpen} />}
    </div>
  );
}

export default Header;
