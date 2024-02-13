import { useEffect, useState } from 'react';
import { useLocation, Location } from 'react-router-dom';

import { PATHS } from '@/constants/paths';

import styles from './ProgressBar.module.css';

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
