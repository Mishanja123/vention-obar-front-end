import { useMenuContext } from '@/context/menuContext';

import { MenuItem } from '@/components/molecules';
import Pagination from '@/components/atoms/Pagination/Pagination';
import MenuPageSkeleton from '@/components/molecules/MenuPageSkeleton/MenuPageSkeleton';

import styles from './MenuList.module.css';

const MenuList = () => {
  const { allItems, items, postsPerPage, totalPosts, paginate, currentPage } =
    useMenuContext();

  return (
    <>
      <ul className={styles.menu_list}>
        {items && items.length > 0 ? (
          items.map((item) => <MenuItem key={item.id} {...item} />)
        ) : (
          <MenuPageSkeleton />
        )}
      </ul>
      {totalPosts >= 12 && (
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
