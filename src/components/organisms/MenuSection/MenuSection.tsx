import React from 'react';
import styles from './MenuSection.module.css';
import { Outlet } from 'react-router-dom';
import MenuNavigator from '@/components/molecules/MenuNavigator/MenuNavigator';
import Pagination from '@/components/atoms/Pagination/Pagination';
import { useMenuContext } from '@/context/menuContext';

type MenuSectionProps = object;

const MenuSection: React.FC<MenuSectionProps> = () => {
  return (
    <section className={styles.menu_section}>
      <h1 className={styles.menu_heading}>Menu</h1>
      <MenuNavigator />
      <Outlet />
    </section>
  );
};

export default MenuSection;
