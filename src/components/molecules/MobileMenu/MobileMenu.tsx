import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './MobileMenu.module.css';
import { IoIosClose } from 'react-icons/io';
import { Button } from '@/components/atoms';
import { PATHS } from '@/constants/paths';
import { PiShoppingCartLight } from 'react-icons/pi';
import { GoPerson } from 'react-icons/go';
import { IconContext } from 'react-icons';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/context/authContext';
import withReactContent from 'sweetalert2-react-content';
import { scrollToReservationForm } from '@/helpers/scrollToReservation.ts';
import { ReservationForm } from '@/components/molecules';
import Swal from 'sweetalert2';
import homeLogo from '@/assets/images/homeLogo.svg';

type MobileMenuProps = {
  onClose: () => void;
  isMenuOpen: boolean;
};
type NavProps = {
  to: string;
  children: React.ReactNode;
};

function MenuNavLink({ to, children }: NavProps) {
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
const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, isMenuOpen }) => {
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
    <div className={`${styles.overlay} ${isOpen ? styles.active : ''}`}>
      <div className={`${styles.modal} ${isOpen ? styles.active : ''}`}>
        <NavLink to={PATHS.ROOT} className={styles.logo_link}>
          <img
            src={homeLogo}
            alt="logo"
            width={120}
            height={60}
            style={{ borderRadius: 20 }}
          />
        </NavLink>
        <button className={styles.closeMenuBtn} onClick={() => onClose()}>
          <IconContext.Provider value={{ className: styles.closeIcon }}>
            <IoIosClose />
          </IconContext.Provider>
        </button>

        <MenuNavLink to={PATHS.MENU}>Menu</MenuNavLink>
        <Button
          variant="contained"
          onClick={
            path === PATHS.ROOT ? scrollToReservationForm : showReservationModal
          }>
          Reserve a table
        </Button>
        <MenuNavLink to={PATHS.ORDERS}>Orders</MenuNavLink>
        <MenuNavLink to={PATHS.CART}>
          <IconContext.Provider value={{ className: styles.cart_img }}>
            <PiShoppingCartLight />
          </IconContext.Provider>
        </MenuNavLink>
        <MenuNavLink to={PATHS.ACCOUNT}>
          <IconContext.Provider value={{ className: styles.profile_img }}>
            <GoPerson />
          </IconContext.Provider>
        </MenuNavLink>
        <Button variant="contained" onClick={() => logOut()}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default MobileMenu;
