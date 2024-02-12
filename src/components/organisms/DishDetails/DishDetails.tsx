/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axiosInstance from '@/services/restaurantAPI';
import { useCartContext } from '@/context/cartContext';

import { Button } from '@/components/atoms';

import styles from './DishDetails.module.css';

type MenuItemData = {
  id: number;
  title: string;
  price: number;
  photoPath: string;
  portion: number;
  ingredients: {
    title: string;
    is_required: boolean;
  }[];
};

const DishDetails = () => {
  const params = useParams();
  const id = parseInt(params.id ?? '0', 10);
  const [dish, setDish] = useState<MenuItemData | null>(null);

  const { addToCart } = useCartContext();

  const getDish = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/dishes/${id}`);
      const dishData: MenuItemData = response.data.dish;
      setDish(dishData);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    getDish(id);
  }, [id]);

  if (!dish) {
    return <div>Loading...</div>;
  }

  const { title, price, photoPath, portion, ingredients }: MenuItemData = dish;
  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleSaveClick = () => {
    setEditing(false);
  };

  return (
    <div className={styles.menu_item_container}>
      <div className={styles.menu_item_image}>
        <img src={photoPath} alt={title} className={styles.dish_img} />
      </div>
      <div className={styles.menu_item_details}>
        <h3 className={styles.menu_item_title}>{title}</h3>
        <div className={styles.edit_box}>
          <p className={styles.ingredients_title}>Ingredients:</p>
          <ul className={styles.ingredients_list}>
            {ingredients.map(({ title }, index) => (
              <li className={styles.ingredients_item} key={index}>
                <span>{title}</span>
              </li>
            ))}
          </ul>
          <p className={styles.menu_item_portion}>Portion: {portion} grams</p>
          <p className={styles.menu_item_price}>Price: ${price}</p>
          <Button variant="contained" onClick={() => addToCart(Number(id))}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
