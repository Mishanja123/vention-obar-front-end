import { useEffect, useState } from 'react';
import { useLocation, Location } from 'react-router-dom';
import styles from './ProgressBar.module.css';
import { PATHS } from '@/constants/paths';

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const location: Location<unknown> = useLocation();

  useEffect(() => {
    if (location.pathname.includes(PATHS.ORDER_CONFIRMATION)) {
      setProgress(1);
    } else if (location.pathname.includes(PATHS.ORDER_PAYMENT)) {
      setProgress(2);
    } else {
      setProgress(0);
    }
  }, [location]);

  return (
    <div className={styles.progressBar_container}>
      <div className={styles.stepContainer}>
        <div className={`${styles.circle} ${styles.isActive}`}></div>
        <div className="">Order Type</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.stepContainer}>
        <div
          className={`${styles.circle} ${progress >= 1 ? styles.isActive : ''}`}
        ></div>
        <div className="">Confirmation</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.stepContainer}>
        <div
          className={`${styles.circle} ${
            progress === 2 ? styles.isActive : ''
          }`}
        ></div>
        <div className="">Payment</div>
      </div>
    </div>
  );
};

export default ProgressBar;
