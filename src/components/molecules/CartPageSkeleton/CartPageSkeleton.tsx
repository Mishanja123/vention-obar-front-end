import { Skeleton } from '@mui/material';
import styles from './CartPageSkeleton.module.css';

function CartPageSkeleton() {
  return (
    <>
      <ul className={styles.skeleton_swiper_list}>
        {[1, 2].map((item) => (
          <Skeleton
            animation="wave"
            variant="rounded"
            width={600}
            className={styles.skeleton_swiper_item}
            height={300}
            key={item}></Skeleton>
        ))}
      </ul>
    </>
  );
}

export default CartPageSkeleton;
