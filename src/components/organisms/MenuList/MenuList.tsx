import styles from './MenuList.module.css';

import { MenuItem } from '@/components/molecules';
import { useMenuContext } from '@/context/menuContext';

const MenuList = () => {
  const { items } = useMenuContext();

  return (
    <ul className={styles.menu_list}>
      {items && items.length > 0 ? (
        items.map((item) => <MenuItem key={item.id} {...item} />)
      ) : (
        <p>Loading...</p>
      )}
    </ul>
  );
};

export default MenuList;
