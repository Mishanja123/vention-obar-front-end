import React from 'react';
import styles from './MenuItem.module.css';
import { PATHS } from '@/constants/paths';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

type MenuItemProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ title, price, image, id }) => {
  return (
    <li className={styles.menuItem}>
      <Link to={`${PATHS.MENU_ITEM}${id}`}>
        <img className={styles.menuItemImg} src={image} alt="Dish_picture" />
        <p className={styles.menuItemTitle}>Title: {title}</p>
        <p className={styles.menuItemPrice}>Price: {price}</p>
      </Link>
      <button className={styles.addToCartBtn}>Add to cart</button>
    </li>
  );
};

export default MenuItem;
