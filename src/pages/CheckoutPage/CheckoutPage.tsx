import OrderMethodSelection from '@/components/molecules/OrderMethodSelection/OrderMethodSelection';
import styles from './CheckoutPage.module.css';
import { Outlet } from 'react-router-dom';

const CheckoutPage = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.info_container}>
        <div className={styles.method_container}>
          <h1>CheckoutPage</h1>
          <OrderMethodSelection />
          <Outlet />
        </div>
        <div className={styles.summarySection}>Placeholder</div>
      </div>
    </div>
  );
};

export default CheckoutPage;
