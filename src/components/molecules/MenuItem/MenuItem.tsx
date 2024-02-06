import styles from './MenuItem.module.css';
import { PATHS } from '@/constants/paths';
import { Link } from 'react-router-dom';
import { useCartContext } from '@/context/cartContext';
interface MenuItemProps {
  id: number;
  photoPath: string;
  title: string;
  price: string;
}
const MenuItem = (props: MenuItemProps) => {
  const { photoPath, title, price, id } = props;
  const { addToCart } = useCartContext();
  return (
    <li className={styles.menu_item}>
      <Link className={styles.menu_link} to={`${PATHS.MENU_ITEM}${id}`}>
        <img
          className={styles.menu_item_img}
          src={photoPath}
          alt="Dish_picture"
        />
        <p className={styles.menu_item_title}>{title}</p>
        <p className={styles.menu_item_price}>{price}$</p>
      </Link>
      <button
        onClick={() => addToCart(Number(id))}
        className={styles.add_to_cart_btn}>
        Add to cart
      </button>
    </li>
  );
};

export default MenuItem;
