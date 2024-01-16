import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { IoMenu } from 'react-icons/io5';

import { PATHS } from '@/constants/paths';

import { SearchInput } from '@/components/atoms/index.ts';
import { MobileMenu, Navigation } from '@/components/molecules';

import homeLogo from '@/assets/images/homeLogo.svg';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.header_wrapper}>
      <button className={styles.menu_btn} type="button" onClick={openMenu}>
        <IconContext.Provider value={{ className: styles.open_menu_btn }}>
          <IoMenu />
        </IconContext.Provider>
      </button>
      <NavLink to={PATHS.ROOT}>
        <img className={styles.logo} src={homeLogo} alt="logo" />
      </NavLink>

      <SearchInput />

      <Navigation loc={'header'} />

      {isMenuOpen && <MobileMenu onClose={closeMenu} isMenuOpen={isMenuOpen} />}
    </div>
  );
};

export default Header;
