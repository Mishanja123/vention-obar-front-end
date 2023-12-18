import { useState } from 'react';
import styles from './MenuNavigator.module.css';

enum MenuCategory {
  SUNRISE_SPECIALS = 'Sunrise Specials',
  CULINARY_CLASSICS = 'Culinary Classics',
  BAR_BLISS = 'Bar Bliss',
  CHEFS_PICK = 'Chefs Pick',
}

const MenuNavigator = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(
    MenuCategory.SUNRISE_SPECIALS,
  );

  const handleCategoryClick = (category: MenuCategory) => {
    setActiveCategory(category);
  };

  return (
    <>
      <ul className={styles.menu_navigation}>
        {Object.values(MenuCategory).map((category) => (
          <button
            key={category}
            className={`${styles.menu_navigation_btn} ${
              activeCategory === category && styles.active
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </ul>
    </>
  );
};

export default MenuNavigator;
