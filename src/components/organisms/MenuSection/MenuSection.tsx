import React, { useState } from 'react';
import MenuList from '../../organisms/MenuList/MenuList';
import MenuNavigator from '../../molecules/MenuNavigator/MenuNavigator';
import styles from './MenuSection.module.css';

type MenuSectionProps = object;

const MenuSection: React.FC<MenuSectionProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <>
      <section className={styles.menu_section}>
        <h1>Menu</h1>
        <MenuNavigator setSelectedCategory={setSelectedCategory} />
        <MenuList selectedCategory={selectedCategory} />
      </section>
    </>
  );
};

export default MenuSection;
