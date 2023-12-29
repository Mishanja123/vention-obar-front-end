import OrderMethodSelection from '@/components/molecules/OrderMethodSelection/OrderMethodSelection';
import styles from './CheckoutPage.module.css';
import { Outlet } from 'react-router-dom';
import ProgressBar from '@/components/molecules/ProgressBar/ProgressBar';
import { CheckoutSummary } from '@/components/organisms';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();

  return (
    <div className={styles.main_container}>
      <ProgressBar />
      <div className={styles.info_container}>
        <div className={styles.method_container}>
          <OrderMethodSelection />
          <Outlet />
        </div>
        <CheckoutSummary path={location.pathname} />
      </div>
    </div>
  );
};

export default CheckoutPage;
