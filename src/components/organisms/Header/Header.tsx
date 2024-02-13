import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { IoMenu } from 'react-icons/io5';
import { MdAdminPanelSettings } from 'react-icons/md';
import { PATHS } from '@/constants/paths';

import { SearchInput } from '@/components/atoms/index.ts';
import { MobileMenu, Navigation } from '@/components/molecules';

import homeLogo from '@/assets/images/homeLogo.svg';
import styles from './Header.module.css';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { role } = useAuth();
  const admin = role === 'admin';

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header_wrapper}>
      <button className={styles.menu_btn} type="button" onClick={openMenu}>
        <IconContext.Provider value={{ className: styles.menu_icon }}>
          <IoMenu />
        </IconContext.Provider>
      </button>
      <NavLink to={PATHS.ROOT}>
        <img className={styles.logo} src={homeLogo} alt="logo" />
      </NavLink>
      {admin && (
        <NavLink to={PATHS.ADMIN}>
          <IconContext.Provider value={{ className: styles.admin_icon }}>
            <MdAdminPanelSettings />
          </IconContext.Provider>
        </NavLink>
      )}

      <SearchInput />

      <Navigation loc={'header'} />

      {isMenuOpen && <MobileMenu onClose={closeMenu} isMenuOpen={isMenuOpen} />}
    </header>
  );
};

export default Header;
