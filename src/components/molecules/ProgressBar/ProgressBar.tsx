import { useEffect, useState } from 'react';
import { useLocation, Location } from 'react-router-dom';
import styles from './ProgressBar.module.css';
import { PATHS } from '@/constants/paths';

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const location: Location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    let progress;

    switch (true) {
      case path.includes(PATHS.ORDER_CONFIRMATION.toLowerCase()):
        progress = 1;
        break;
      case path.includes(PATHS.ORDER_PAYMENT.toLowerCase()):
        progress = 2;
        break;
      default:
        progress = 0;
    }

    setProgress(progress);
  }, [path]);
  return (
    <>
      <ol className={styles.progressBar_container}>
        <li className={styles.stepContainer}>
          <div className={`${styles.circle} ${styles.isActive}`}></div>
          <p className="">Order Type</p>
        </li>
        <div className={styles.line}></div>
        <li className={styles.stepContainer}>
          <div
            className={`${styles.circle} ${
              progress >= 1 ? styles.isActive : ''
            }`}
          ></div>
          <p className="">Confirmation</p>
        </li>
        <div className={styles.line}></div>
        <li className={styles.stepContainer}>
          <div
            className={`${styles.circle} ${
              progress === 2 ? styles.isActive : ''
            }`}
          ></div>
          <p className="">Payment</p>
        </li>
      </ol>
    </>
  );
};

export default ProgressBar;
