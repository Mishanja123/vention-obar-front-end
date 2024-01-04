import menuData from '@/menuData/menuData.json';

import { MenuItem } from '@/components/molecules';

import styles from './MenuList.module.css';
import { CartItem } from '@/models/cart.model';
import { useCartService } from '@/hooks/useCartService';

type MenuItemData = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
};

const MenuList = () => {
  const items: MenuItemData[] = menuData;
  const { addToCart } = useCartService();

  const handleAddToCart = (item: CartItem) => {
    addToCart(item);
  };

  return (
    <ul className={styles.menu_list}>
      {items.map((item) => (
        <MenuItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          imageURL={item.image}
          addToCart={handleAddToCart}
        />
      ))}
    </ul>
  );
};

export default MenuList;
