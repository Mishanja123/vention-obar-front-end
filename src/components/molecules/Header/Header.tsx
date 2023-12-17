import { NavLink } from 'react-router-dom';
import { SiIfood } from 'react-icons/si';
import { PiShoppingCartLight } from 'react-icons/pi';
import { GoPerson } from 'react-icons/go';
import { IconContext } from 'react-icons';

import SearchInput from '../../atoms/SearchInput/SearchInput.tsx';
import { PATHS } from '../../../constants/paths.ts';
import styles from './Header.module.css';

function Header() {
  return (
    <div className={styles.headerWrapper}>
      <NavLink to={PATHS.ROOT} className={styles.logoLink}>
        OBar
        <IconContext.Provider value={{ className: styles.logoImg }}>
          <SiIfood />
        </IconContext.Provider>
      </NavLink>
      <SearchInput />
      <NavLink to={PATHS.MENU} className={styles.menuLink}>
        Menu
      </NavLink>
      <NavLink to={PATHS.BOOK_TABLE} className={styles.reserveTableLink}>
        Reserve a table
      </NavLink>
      <NavLink to={PATHS.ORDERS} className={styles.ordersLink}>
        Orders
      </NavLink>
      <NavLink to={PATHS.CART} className={styles.cartLink}>
        <IconContext.Provider value={{ className: styles.cartImg }}>
          <PiShoppingCartLight />
        </IconContext.Provider>
      </NavLink>
      <NavLink to={PATHS.ACCOUNT} className={styles.profileLink}>
        <IconContext.Provider value={{ className: styles.profileImg }}>
          <GoPerson />
        </IconContext.Provider>
      </NavLink>
    </div>
  );
}

export default Header;
