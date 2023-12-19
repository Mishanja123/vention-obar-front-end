import { useState } from 'react';
import dishMoreInfo from '@/menuData/dishMoreInfo.json';
import styles from './MenuItemInfo.module.css';

type MenuItemData = {
  id: number;
  title: string;
  price: number;
  image: string;
  portion: number;
  ingredients: {
    title: string;
    is_required: boolean;
  }[];
};

const MenuItemInfo = () => {
  const [editing, setEditing] = useState(false);
  const dish: MenuItemData | undefined = dishMoreInfo.find(
    (item) => item.id === 1,
  );

  if (!dish) {
    return <div>Loading...</div>;
  }

  const { title, price, image, portion, ingredients } = dish;

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleSaveClick = () => {
    setEditing(false);
  };

  return (
    <div className={styles.menu_item_container}>
      <div className={styles.menu_item_image}>
        <img src={image} alt={title} className={styles.dish_img} />
      </div>
      <div className={styles.menu_item_details}>
        <h3 className={styles.menu_item_title}>{title}</h3>
        <p className={styles.ingredients_title}>Ingredients:</p>
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
        <p className={styles.menu_item_price}>Price: ${price.toFixed(2)}</p>
        <button className={styles.menu_button_cart}>Add to cart</button>
        {editing ? (
          <button className={styles.menu_button} onClick={handleSaveClick}>
            &#9745; Save
          </button>
        ) : (
          <button className={styles.menu_button} onClick={handleEditClick}>
            &#9998; Edit ingridients
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuItemInfo;
