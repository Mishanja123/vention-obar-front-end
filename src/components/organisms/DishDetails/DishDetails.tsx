/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import styles from './DishDetails.module.css';
import { useParams } from 'react-router-dom';
import axiosInstance from '@/services/restaurantAPI';
import { useCartContext } from '@/context/cartContext';

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
  const [editing, setEditing] = useState(false);
  const [dish, setDish] = useState();

  const { addToCart } = useCartContext();

  const getDish = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/dishes/${id}`);
      const dish = response.data.dish;
      setDish(dish);
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
          {editing ? (
            <button className={styles.menu_button} onClick={handleSaveClick}>
              &#9745; Save
            </button>
          ) : (
            <button className={styles.menu_button} onClick={handleEditClick}>
              &#9998; Edit
            </button>
          )}
        </div>
        <ul className={styles.ingredients_list}>
          {ingredients.map(({ title, is_required }, index) => (
            <li className={styles.ingredients_item} key={index}>
              <span>{title}</span>
              {is_required && editing ? (
                <span className={styles.required_span}>required</span>
              ) : (
                <></>
              )}
              {editing && !is_required && <input type="checkbox" />}
            </li>
          ))}
        </ul>
        <p className={styles.menu_item_portion}>Portion: {portion} grams</p>
        <p className={styles.menu_item_price}>Price: ${price}</p>
        <button
          onClick={() => addToCart(Number(id))}
          className={styles.menu_button_cart}>
          Add to cart
        </button>{' '}
      </div>
    </div>
  );
};

export default DishDetails;
