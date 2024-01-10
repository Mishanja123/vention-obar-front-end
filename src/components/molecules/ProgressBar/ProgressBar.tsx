import { useEffect, useState } from 'react';
import { useLocation, Location } from 'react-router-dom';
import styles from './ProgressBar.module.css';
import { PATHS } from '@/constants/paths';

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const location: Location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
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
      {/* <ol className={styles.progressBar_container}>
        <li className={styles.stepContainer}>
          <div className={`${styles.circle} ${styles.isActive}`}></div>
          <p className={styles.progressBar_title}>Order Type</p>
        </li>
        <div className={styles.line}></div>
        <li className={styles.stepContainer}>
          <div
            className={`${styles.circle} ${
              progress >= 1 ? styles.isActive : ''
            }`}></div>
          <p className={styles.progressBar_title}>Confirmation</p>
        </li>
        <div className={styles.line}></div>
        <li className={styles.stepContainer}>
          <div
            className={`${styles.circle} ${
              progress === 2 ? styles.isActive : ''
            }`}></div>
          <p className={styles.progressBar_title}>Payment</p>
        </li>
      </ol> */}
      <div className={styles.progress_bar_wrapper}>
        <div className={styles.container}>
          <div className={styles.steps}>
            <span className={`${styles.circle} ${styles.isActive}`}>1</span>
            <span
              className={`${styles.circle} ${
                progress >= 1 ? styles.isActive : ''
              }`}>
              2
            </span>
            <span
              className={`${styles.circle} ${
                progress === 2 ? styles.isActive : ''
              }`}>
              3
            </span>
            <div className={styles.progress_bar}>
              <span
                className={`${styles.progress_bar_indicator}`}
                style={{ width: `${(progress / (3 - 1)) * 100}%` }}></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
