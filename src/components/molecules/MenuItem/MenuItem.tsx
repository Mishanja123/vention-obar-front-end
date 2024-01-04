import React from 'react';
import styles from './MenuItem.module.css';
import { PATHS } from '@/constants/paths';
import { Link } from 'react-router-dom';
import { CartItem } from '@/models/cart.model';

type MenuItemProps = {
  id: string;
  title: string;
  price: number;
  imageURL: string;
  addToCart: (item: CartItem) => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  price,
  imageURL,
  id,
  addToCart,
}) => {
  const item: CartItem = {
    id,
    title,
    price,
    quantity: 1,
    imageURL,
  };

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <li className={styles.menu_item}>
      <Link className={styles.menu_link} to={`${PATHS.MENU_ITEM}${id}`}>
        <img
          className={styles.menu_item_img}
          src={imageURL}
          alt="Dish_picture"
        />
        <p className={styles.menu_item_title}>{title}</p>
        <p className={styles.menu_item_price}>{price}$</p>
      </Link>
      <button onClick={handleAddToCart} className={styles.add_to_cart_btn}>
        Add to cart
      </button>
    </li>
  );
};

export default MenuItem;
