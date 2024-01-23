import menuData from '@/menuData/menuData.json';
import { SliderWrapper } from '@/components/atoms';
import { MenuItem } from '@/components/molecules';

import styles from './MainMenuSection.module.css';

type MenuItemData = {
  id: number;
  id: number;
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
          {items.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              photo_path={item.image}
            />
          ))}
        </SliderWrapper>
      </ul>
    </section>
  );
};

export default MainMenuSection;
