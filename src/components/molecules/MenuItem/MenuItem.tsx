import React from 'react';
import styles from './MenuItem.module.css';
import { PATHS } from '@/constants/paths';
import { Link } from 'react-router-dom';
import { IDish } from '@/types/dish';

const MenuItem: React.FC<IDish> = ({ title, price, photo_path, id }) => {
  return (
    <li className={styles.menu_item}>
      <Link className={styles.menu_link} to={`${PATHS.MENU_ITEM}${id}`}>
        <img
          className={styles.menu_item_img}
          src={photo_path}
          alt="Dish_picture"
        />
        <p className={styles.menu_item_title}>Title: {title}</p>
        <p className={styles.menu_item_price}>Price: {price}$</p>
      </Link>
      <button className={styles.add_to_cart_btn}>Add to cart</button>
    </li>
  );
};

export default MenuItem;
