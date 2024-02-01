import { useMenuContext } from '@/context/menuContext';

import { MenuItem } from '@/components/molecules';
import Pagination from '@/components/atoms/Pagination/Pagination';

import styles from './MenuList.module.css';

const MenuList = () => {
  const { allItems, postsPerPage, totalPosts, paginate, currentPage } =
    useMenuContext();

  return (
    <>
      <ul className={styles.menu_list}>
        {allItems && allItems.length > 0 ? (
          allItems.map((item) => <MenuItem key={item.id} {...item} />)
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
