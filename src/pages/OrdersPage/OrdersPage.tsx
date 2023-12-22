import { OrdersPageSection } from '@/components/organisms';

import styles from './OrdersPage.module.css'

const OrdersPage = () => {
  return (
    <section className={styles.orders_section}>
      <OrdersPageSection />
    </section>
  );
};

export default OrdersPage;
