import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { SiIfood } from 'react-icons/si';
import { PiShoppingCartLight } from 'react-icons/pi';
import { GoPerson } from 'react-icons/go';
import { IconContext } from 'react-icons';

import SearchInput from '../../atoms/SearchInput/SearchInput.tsx';
import { PATHS } from '../../../constants/paths.ts';
import styles from './Header.module.css';

function HeaderNavLink({ to, children }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? styles.active : '')}>
      {children}
    </NavLink>
  );
}

function Header() {
  return (
    <div className={styles.header_wrapper}>
      <NavLink to={PATHS.ROOT} className={styles.logo_link}>
        OBar
        <IconContext.Provider value={{ className: styles.logo_img }}>
          <SiIfood />
        </IconContext.Provider>
      </NavLink>
      <SearchInput />
      <HeaderNavLink to={PATHS.MENU}>Menu</HeaderNavLink>
      <HeaderNavLink to={PATHS.BOOK_TABLE}>Reserve a table</HeaderNavLink>
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
    </div>
  );
}

export default Header;

type Props = {
  to: string;
  children: React.ReactNode;
};
