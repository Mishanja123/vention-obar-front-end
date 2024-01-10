import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './MobileMenu.module.css';

type MobileMenuProps = {
  onClose: () => void;
  isMenuOpen: boolean;
};

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

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.active : ''}`}>
      <div className={`${styles.modal} ${isOpen ? styles.active : ''}`}>
        <button onClick={() => onClose()}>close</button>
      </div>
    </div>
  );
};

export default MobileMenu;
