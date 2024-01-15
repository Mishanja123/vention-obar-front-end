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
        <Navigation />
      </div>

      {isMenuOpen && <MobileMenu onClose={closeMenu} isMenuOpen={isMenuOpen} />}
    </div>
  );
};

export default Header;
