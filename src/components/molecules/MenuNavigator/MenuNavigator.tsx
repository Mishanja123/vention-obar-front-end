import { useState } from 'react';
import styles from './MenuNavigator.module.css';

type MenuNavigatorProps = {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const MenuNavigator: React.FC<MenuNavigatorProps> = ({
  setSelectedCategory,
}) => {
  const [activeCategory, setActiveCategory] =
    useState<string>('SUNRISE_SPECIALS');
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActiveCategory(category);
  };

  return (
    <>
      <ul className={styles.menu_navigation}>
        <button
          className={styles.menu_navigation_btn}
          onClick={() => handleCategoryClick('SUNRISE_SPECIALS')}
        >
          Sunrise Specials
        </button>
        <button
          className={styles.menu_navigation_btn}
          onClick={() => handleCategoryClick('CULINARY_CLASSICS')}
        >
          Culinary Classics
        </button>
        <button
          className={styles.menu_navigation_btn}
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
