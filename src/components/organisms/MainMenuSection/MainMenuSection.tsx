import menuData from '@/menuData/menuData.json';
import { SliderWrapper } from '@/components/atoms';
import { MenuItem } from '@/components/molecules';

import styles from './MainMenuSection.module.css';

type MenuItemData = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
};

const MainMenuSection = () => {
  const items: MenuItemData[] = menuData;

  return (
    <section id="menu" className={styles.menu_container}>
      <h2 className={styles.menu_heading}>Menu</h2>
      <ul className={styles.main_menu_list}>
        <SliderWrapper
          arrows={true}
          dots={false}
          autoplay={true}
          autoplaySpeed={8000}
          speed={500}
          slidesToShow={4}
          slidesToScroll={4}
          swipeToSlide={true}
          focusOnSelect={true}
          centerMode={true}
          centerPadding={-100}>
          {items.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
            />
          ))}
        </SliderWrapper>
      </ul>
    </section>
  );
};

export default MainMenuSection;
