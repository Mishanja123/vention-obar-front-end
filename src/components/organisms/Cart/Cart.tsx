import { CartItems, EmptyCart, SummaryPayment } from '@/components/molecules';
import styles from './Cart.module.css';
import { Button } from '@/components/atoms';
import { Link } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import { useCartContext } from '@/context/cartContext';

const Cart = () => {
  const { cartItems, removeAllFromCart } = useCartContext();

  const allDishesQuantity = cartItems?.dishes?.reduce((total, item) => {
    const allDishes = total + item.quantity;
    return allDishes;
  }, 0);

  return cartItems?.dishes?.length === 0 ? (
    <EmptyCart />
  ) : (
    <div className={styles.cart}>
      <div className={styles.cart_list_wrapper}>
        <button
          onClick={() => removeAllFromCart()}
          className={styles.cart_remove_all_btn}>
          Remove all
        </button>
        <ul className={styles.cart_list}>
          {cartItems?.dishes?.map((item) => (
            <CartItems
              key={item.dishData.id}
              quantity={item.quantity}
              {...item.dishData}
            />
          ))}
        </ul>
      </div>

      <SummaryPayment
        quantity={allDishesQuantity}
        subtotal={cartItems?.subTotal}
        total={cartItems?.total}>
        <Link to={PATHS.CHECKOUT}>
          <Button variant="contained" type="button">
            Checkout
          </Button>
        </Link>
      </SummaryPayment>
    </div>
  );
};

export default Cart;
