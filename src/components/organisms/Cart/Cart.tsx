import { CartItems, EmptyCart, SummaryPayment } from '@/components/molecules';
import { useCartService } from '@/hooks/useCartService';
import styles from './Cart.module.css';
import { Button } from '@/components/atoms';
import { Link } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import { CartItem } from '@/models/cart.model';

// const cartItemss = [
//   {
//     id: '1',
//     imageURL: sprite,
//     title: 'Title',
//     price: 600,
//     quantity: 5,
//   },
//   {
//     id: '2',
//     imageURL: sprite,
//     title: 'Title',
//     price: 700,
//     quantity: 7,
//   },
//   {
//     id: '3',
//     imageURL: sprite,
//     title: 'Title',
//     price: 800,
//     quantity: 9,
//   },
// ];

const Cart = () => {
  const { cart, clearCart, addToCart, removeFromCart } = useCartService();
  console.log(cart.items);
  if (cart.items.length === 0) {
    return <EmptyCart />;
  }

  const handleAddToCart = (item: CartItem) => {
    addToCart(item);
  };
  const handleRemoveFromCart = (item: CartItem) => {
    removeFromCart(item);
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart_list_wrapper}>
        <button className={styles.cart_remove_all_btn} onClick={clearCart}>
          Remove all
        </button>
        <ul className={styles.cart_list}>
          {cart.items.map((item) => (
            <CartItems
              key={item.id}
              {...item}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
            />
          ))}
        </ul>
      </div>

      <SummaryPayment quantity={20} subtotal={50} total={500}>
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
