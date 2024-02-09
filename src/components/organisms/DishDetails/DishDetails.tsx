import { useEffect, useState } from 'react';
import styles from './DishDetails.module.css';
import { useParams } from 'react-router-dom';
import axiosInstance from '@/services/restaurantAPI';
import { useCartContext } from '@/context/cartContext';
import { Button } from '@/components/atoms';

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
  const [dish, setDish] = useState<MenuItemData | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<boolean[]>([]);

  const { addToCart } = useCartContext();

  const getDish = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/dishes/${id}`);
      const dishData: MenuItemData = response.data.dish;
      setDish(dishData);
      // Инициализируем массив выбранных ингредиентов
      setSelectedIngredients(dishData.ingredients.map(() => false));
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
    const initialSelection = ingredients.map(
      (ingredient) => !ingredient.is_required,
    );
    setSelectedIngredients(initialSelection);
  };

  const handleSaveClick = () => {
    setEditing(false);
    const newIngredients = ingredients.map((ingredient, index) => {
      if (!ingredient.is_required && !selectedIngredients[index]) {
        return false;
      }
      return true;
    });
    setSelectedIngredients(newIngredients);
  };

  const handleIngredientToggle = (index: number) => {
    const newSelectedIngredients = [...selectedIngredients];
    newSelectedIngredients[index] = !newSelectedIngredients[index];
    setSelectedIngredients(newSelectedIngredients);
  };

  const handleAddToCart = async () => {
    addToCart(Number(id));
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
              <span
                style={{
                  color:
                    selectedIngredients[index] && !is_required && editing
                      ? 'lightgray'
                      : 'inherit',
                }}>
                {title}
              </span>
              {is_required && editing ? (
                <span className={styles.required_span}>required</span>
              ) : (
                <></>
              )}
              {editing && !is_required && (
                <input
                  type="checkbox"
                  checked={selectedIngredients[index]}
                  onChange={() => handleIngredientToggle(index)}
                />
              )}
            </li>
          ))}
        </ul>
        <p className={styles.menu_item_portion}>Portion: {portion} grams</p>
        <p className={styles.menu_item_price}>Price: ${price}</p>
        <Button variant="contained" onClick={() => handleAddToCart()}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default DishDetails;
