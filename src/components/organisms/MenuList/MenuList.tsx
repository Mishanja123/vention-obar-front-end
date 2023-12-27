import menuData from '@/menuData/menuData.json';

import { MenuItem } from '@/components/molecules';

import styles from './MenuList.module.css';

type MenuItemData = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
};

const MenuList = () => {
  const items: MenuItemData[] = menuData;

  return (
    <ul className={styles.menu_list}>
      {items.map((item) => (
        <MenuItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
        />
      ))}
    </ul>
  );
};

export default MenuList;
