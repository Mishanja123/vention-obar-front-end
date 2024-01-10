import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PiShoppingCartLight } from 'react-icons/pi';
import { GoPerson } from 'react-icons/go';
import { IconContext } from 'react-icons';
import homeLogo from '@/assets/images/homeLogo.svg';

import { SearchInput } from '@/components/atoms/index.ts';
import { PATHS } from '@/constants/paths';
import styles from './Header.module.css';
import { Button } from '@/components/atoms/index.ts';
import { scrollToReservationForm } from '@/helpers/scrollToReservation.ts';
import { ReservationForm } from '@/components/molecules';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuthContext } from '@/context/authContext';

function HeaderNavLink({ to, children }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? styles.active : styles.header_link_item
      }>
      {children}
    </NavLink>
  );
}

function Header() {
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

  return (
    <div className={styles.header_wrapper}>
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
      <HeaderNavLink to={PATHS.MENU}>Menu</HeaderNavLink>
      <Button
        variant="contained"
        onClick={
          path === PATHS.ROOT ? scrollToReservationForm : showReservationModal
        }>
        Reserve a table
      </Button>
      <HeaderNavLink to={PATHS.ORDERS}>Orders</HeaderNavLink>
      <HeaderNavLink to={PATHS.CART}>
        <IconContext.Provider value={{ className: styles.cart_img }}>
          <PiShoppingCartLight />
        </IconContext.Provider>
      </HeaderNavLink>
      <HeaderNavLink to={PATHS.ACCOUNT}>
        <IconContext.Provider value={{ className: styles.profile_img }}>
          <GoPerson />
        </IconContext.Provider>
      </HeaderNavLink>
      <Button variant="contained" onClick={() => logOut()}>
        Log out
      </Button>
    </div>
  );
}

export default Header;

type Props = {
  to: string;
  children: React.ReactNode;
};
