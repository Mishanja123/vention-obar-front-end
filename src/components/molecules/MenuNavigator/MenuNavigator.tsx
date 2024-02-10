import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { handleTitleNormalized } from '@/helpers';
import { useMenuContext } from '@/context/menuContext';
import { PATHS } from '@/constants/paths';
import { DISHCATEGORY } from '@/constants/categoryDish';

import styles from './MenuNavigator.module.css';

const MenuNavigator = () => {
  const [activeCategory, setActiveCategory] = useState<
    DISHCATEGORY | DISHCATEGORY.SINRISE
  >(DISHCATEGORY.SINRISE);
  const location = useLocation();
  const navigate = useNavigate();
  const { setCategory } = useMenuContext();

  const MENU_PATH = PATHS.MENU;

  const handleCategoryClick = (category: DISHCATEGORY) => {
    setActiveCategory(category);
    setCategory(category);
    if (location.pathname !== MENU_PATH) navigate(MENU_PATH);
  };

  return (
    <>
      <ul className={styles.menu_navigation}>
        {Object.values(DISHCATEGORY).map((category) => (
          <button
            key={category}
            className={`${styles.menu_navigation_btn} ${
              activeCategory === category && styles.active
            }`}
            onClick={() => handleCategoryClick(category)}>
            {handleTitleNormalized(category)}
          </button>
        ))}
      </ul>
    </>
  );
};

export default MenuNavigator;
