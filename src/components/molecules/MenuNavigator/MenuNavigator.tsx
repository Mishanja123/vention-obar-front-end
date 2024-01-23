import { useState } from 'react';
import styles from './MenuNavigator.module.css';
import { useMenuContext } from '@/context/menuContext';
import { DISHCATEGORY } from '@/constants/categoryDish';
import { handleTitleNormalized } from '@/helpers';

const MenuNavigator = () => {
  const [activeCategory, setActiveCategory] = useState<DISHCATEGORY | null>(
    null,
  );

  const { setCategory } = useMenuContext();

  const handleCategoryClick = (category: DISHCATEGORY) => {
    setActiveCategory(category);
    setCategory(category);
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
