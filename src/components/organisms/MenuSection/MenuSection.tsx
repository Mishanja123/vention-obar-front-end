import React from 'react';
import { Outlet } from 'react-router-dom';

import MenuNavigator from '@/components/molecules/MenuNavigator/MenuNavigator';

import styles from './MenuSection.module.css';

type MenuSectionProps = object;

const MenuSection: React.FC<MenuSectionProps> = () => {
  return (
    <section className={styles.menu_section}>
      <MenuNavigator />
      <Outlet />
    </section>
  );
};

export default MenuSection;
