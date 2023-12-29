import React from 'react';
import MenuNavigator from '../../molecules/MenuNavigator/MenuNavigator';
import styles from './MenuSection.module.css';
import { Outlet } from 'react-router-dom';

type MenuSectionProps = object;

const MenuSection: React.FC<MenuSectionProps> = () => {
  return (
    <>
      <section className={styles.menu_section}>
        <h1 className={styles.menu_heading}>Menu</h1>
        <MenuNavigator />
        <Outlet />
      </section>
    </>
  );
};

export default MenuSection;
