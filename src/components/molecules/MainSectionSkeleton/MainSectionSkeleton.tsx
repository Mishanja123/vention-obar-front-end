import { Skeleton } from '@mui/material';
import styles from './MainSectionSkeleton.module.css';

function MainSectionSkeleton() {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{ bgcolor: '#daa520' }}
        width={1450}
        className={styles.skeleton_navigation_tab}
        height={500}></Skeleton>

      <Skeleton
        animation="wave"
        variant="rounded"
        sx={{ bgcolor: '#daa520' }}
        width={700}
        className={styles.skeleton_form}
        height={300}>
        <h1>sss</h1>
      </Skeleton>
      <ul className={styles.skeleton_swiper_list}>
        {[1, 2, 3, 4].map((item) => (
          <Skeleton
            animation="wave"
            variant="rounded"
            sx={{ bgcolor: '#daa520' }}
            width={200}
            className={styles.skeleton_swiper_item}
            height={200}
            key={item}></Skeleton>
        ))}
      </ul>
    </>
  );
}

export default MainSectionSkeleton;
