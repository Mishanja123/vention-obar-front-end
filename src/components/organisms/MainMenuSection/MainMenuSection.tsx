import { useEffect } from 'react';

import { useMenuContext } from '@/context/menuContext';
import { DISHCATEGORY } from '@/constants/categoryDish';

import { SliderWrapper } from '@/components/atoms';
import { MenuItem } from '@/components/molecules';

import styles from './MainMenuSection.module.css';

const MainMenuSection = () => {
  const { items, setCategory } = useMenuContext();

  useEffect(() => {
    setCategory(DISHCATEGORY.CHEFS_PICK);
  }, [setCategory]);

  return (
    <section id="menu" className={styles.menu_container}>
      <h2 className={styles.menu_heading}>Chefs pick</h2>
      <ul className={styles.main_menu_list}>
        <SliderWrapper
          // @ts-expect-error existing value
          arrows={true}
          dots={false}
          autoplay={true}
          autoplaySpeed={8000}
          speed={500}
          slidesToShow={4}
          slidesToScroll={1}
          swipeToSlide={true}
          focusOnSelect={true}
          centerMode={true}
          centerPadding={-100}>
          {items && items.length > 0 ? (
            items.map((item) => <MenuItem key={item.id} {...item} />)
          ) : (
            <p>Loading...</p>
          )}
        </SliderWrapper>
      </ul>
    </section>
  );
};

export default MainMenuSection;
