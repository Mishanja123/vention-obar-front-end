import { useState } from 'react';
import styles from './MenuNavigator.module.css';

const MenuNavigator = () => {
  const [activeCategory, setActiveCategory] =
    useState<string>('SUNRISE_SPECIALS');
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <>
      <ul className={styles.menu_navigation}>
        <button
          className={`${styles.menu_navigation_btn} ${
            activeCategory === 'SUNRISE_SPECIALS' && styles.active
          }`}
          onClick={() => handleCategoryClick('SUNRISE_SPECIALS')}
        >
          Sunrise Specials
        </button>
        <button
          className={`${styles.menu_navigation_btn} ${
            activeCategory === 'CULINARY_CLASSICS' && styles.active
          }`}
          onClick={() => handleCategoryClick('CULINARY_CLASSICS')}
        >
          Culinary Classics
        </button>
        <button
          className={`${styles.menu_navigation_btn} ${
            activeCategory === 'BAR_BLISS' && styles.active
          }`}
          onClick={() => handleCategoryClick('BAR_BLISS')}
        >
          Bar Bliss
        </button>
        <button
          className={`${styles.menu_navigation_btn} ${
            activeCategory === 'CHEFS_PICK' && styles.active
          }`}
          onClick={() => handleCategoryClick('CHEFS_PICK')}
        >
          Chefs Pick
        </button>
      </ul>
    </>
  );
};

export default MenuNavigator;
