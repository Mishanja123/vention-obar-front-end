import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './MobileMenu.module.css';
import { IoIosClose } from 'react-icons/io';
import { PATHS } from '@/constants/paths';
import { IconContext } from 'react-icons';
import { NavLink } from 'react-router-dom';
import homeLogo from '@/assets/images/homeLogo.svg';
import { Navigation } from '@/components/molecules';

type Props = {
  onClose: () => void;
  isMenuOpen: boolean;
};

const MobileMenu: React.FC<Props> = ({ onClose, isMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown, false);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [onClose]);

  useEffect(() => {
    if (isMenuOpen) {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isMenuOpen]);

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.active : ''}`}>
      <div className={`${styles.modal} ${isOpen ? styles.active : ''}`}>
        <button className={styles.closeMenuBtn} onClick={() => onClose()}>
          <IconContext.Provider value={{ className: styles.closeIcon }}>
            <IoIosClose />
          </IconContext.Provider>
        </button>
        <NavLink to={PATHS.ROOT} className={styles.logo_link}>
          <img className={styles.logo} src={homeLogo} alt="logo" />
        </NavLink>

        <Navigation loc={'mobile_menu'} />
      </div>
    </div>
  );
};

export default MobileMenu;
