import styles from './MenuList.module.css';

import { MenuItem } from '@/components/molecules';
import { useMenuContext } from '@/context/menuContext';
import Pagination from '@/components/atoms/Pagination/Pagination';

const MenuList = () => {
  const { items, postsPerPage, totalPosts, paginate, currentPage } =
    useMenuContext();

  return (
    <>
      <ul className={styles.menu_list}>
        {items && items.length > 0 ? (
          //@ts-ignore
          items.map((item) => <MenuItem key={item.id} {...item} />)
        ) : (
          <p>Loading...</p>
        )}
      </ul>
      {totalPosts < 12 ? (
        ''
      ) : (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={totalPosts}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default MenuList;
