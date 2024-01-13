import { Cart } from '@/components/organisms';
import styles from './CartPage.module.css';
const CartPage = () => {
  return (
    <section className={styles.cart_section}>
      <Cart />
    </section>
  );
};

export default CartPage;
