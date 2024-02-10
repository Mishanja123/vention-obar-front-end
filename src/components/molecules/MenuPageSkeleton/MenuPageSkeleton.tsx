import { Skeleton } from '@mui/material';

import styles from './MenuPageSkeleton.module.css';

function MenuPageSkeleton() {
  return (
    <>
      <ul className={styles.skeleton_swiper_list}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <Skeleton
            animation="wave"
            variant="rounded"
            width={256}
            className={styles.skeleton_swiper_item}
            height={380}
            key={item}></Skeleton>
        ))}
      </ul>
    </>
  );
}

export default MenuPageSkeleton;
