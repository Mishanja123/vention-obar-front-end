import { useEffect, useState } from 'react';
import { Button } from '@/components/atoms';
import axiosInstance from '@/services/restaurantAPI';
import styles from './DishManagement.module.css';
import { IDish, Ingredients } from '@/types/dish';
import { DISHCATEGORY } from '@/constants/categoryDish';
import { useMenuContext } from '@/context/menuContext';
import IngredientsComponent from '@/components/molecules/IngredientsComponent/IngredientsComponent';
import LoadingButtonFC from '@/components/atoms/LoadingButton/LoadingButton';
import useMutation from '@/hooks/useMutation';

const URL = '/dish-images';
const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const DishManagement = () => {
  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: URL });
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedDish, setEditedDish] = useState<IDish>({} as IDish);
  const [postRequest, setPostRequest] = useState<boolean>(false);
  // const [dishImage, setDishImage] = useState([]);
  const { allItems } = useMenuContext();
  const [newDish, setNewDish] = useState<Omit<IDish, 'id'>>({
    title: '',
    category: DISHCATEGORY.BAR_BLISS,
    price: '0',
    photoPath: '',
    weightGrams: 0,
    ingredients: [
      {
        title: 'Ingredient 1',
        is_required: false,
      },
      {
        title: 'Ingredient 2',
        is_required: true,
      },
    ],
  });

  const handleImageUpload = async (file: File) => {
    try {
      if (!validFileTypes.find((type) => type === file.type)) {
        console.error('Invalid file type');
        return;
      }

      const form = new FormData();
      form.append('image', file);

      await uploadImage({ file: form });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const getS3ImageUrl = async (file: File) => {
    try {
      const response = await axiosInstance.post('/dish-image', {
        name: file.name,
      });
      const image = response.data.data;
      console.log(image);
      return image;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    await handleImageUpload(file);
    const photoPath = await getS3ImageUrl(file);
    setEditedDish({ ...editedDish, photoPath });
  };
  const handleAddDish = () => {
    setDishes((prevDishes) => [
      ...prevDishes,
      { ...newDish, id: allItems.length + 1 },
    ]);

    setEditingIndex(dishes.length);
    setPostRequest(true);
    setEditedDish({ ...newDish, id: allItems.length + 1 });
  };

  const handleDishEdit = (index: number) => {
    setEditingIndex(index);
    setEditedDish({ ...allItems[index] });
  };

  const handleDishSave = async () => {
    try {
      if (postRequest) {
        const response = await axiosInstance.post('/dishes', editedDish);
        setDishes((prevDishes) => [
          ...prevDishes.slice(0, prevDishes.length - 1),
          response.data,
        ]);
        setEditingIndex(0);
      } else {
        await axiosInstance.patch(`/dishes/${editedDish.id}`, editedDish);

        const updatedDishes = [...dishes];
        updatedDishes[editingIndex!] = editedDish;

        setDishes(updatedDishes);
        setEditingIndex(null);
        setEditedDish({} as IDish);
      }
    } catch (error) {
      console.log(
        'Oops, there was an error updating/saving the dish: ' + error,
      );
    } finally {
      setEditingIndex(null);
      setNewDish({
        title: '',
        category: DISHCATEGORY.BAR_BLISS,
        price: '0',
        photoPath: 'https://placehold.co/400',
        weightGrams: 0,
        ingredients: [],
      });
    }
  };

  const handleIngredientChange = (
    ingredientIndex: number,
    key: keyof Ingredients,
    value: string | boolean,
  ) => {
    setEditedDish((prev) => {
      const updatedIngredients = [...prev.ingredients];
      updatedIngredients[ingredientIndex] = {
        ...updatedIngredients[ingredientIndex],
        [key]: value,
      };
      return { ...prev, ingredients: updatedIngredients };
    });
  };

  useEffect(() => {
    setDishes(allItems);
  }, [allItems]);

  return (
    <section className={styles.dish_management_section}>
      <table className={styles.dish_table}>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Dish picture</th>
            <th>Weight/g</th>
            <th>Ingredients</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish, index) => (
            <tr key={index}>
              <td>{dish.id}</td>
              <td>
                {editingIndex === index ? (
                  <input
                    className={styles.dish_input}
                    value={editedDish.title}
                    onChange={(e) =>
                      setEditedDish({ ...editedDish, title: e.target.value })
                    }
                  />
                ) : (
                  dish.title
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <select
                    className={styles.dish_input}
                    value={editedDish.category}
                    onChange={(e) =>
                      setEditedDish({
                        ...editedDish,
                        category: e.target.value as DISHCATEGORY,
                      })
                    }>
                    {Object.values(DISHCATEGORY).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                ) : (
                  dish.category
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    className={styles.dish_input}
                    value={editedDish.weightGrams}
                    onChange={(e) =>
                      setEditedDish({
                        ...editedDish,
                        weightGrams: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  dish.weightGrams
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <div className="">
                    <>
                      {editedDish.photoPath ? (
                        <img
                          className={styles.dish_img}
                          src={editedDish.photoPath}
                          alt="dish"
                        />
                      ) : (
                        <div className="">
                          <LoadingButtonFC
                            uploading={uploading}
                            editMode={editingIndex === index}
                            handleChange={handleSetImage}
                          />
                          {uploadError && (
                            <div className="">Error occurred</div>
                          )}
                        </div>
                      )}
                    </>
                  </div>
                ) : (
                  <img
                    src={dish.photoPath}
                    className={styles.dish_img}
                    alt="dish"
                  />
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    className={styles.dish_input}
                    value={editedDish.price.toString()}
                    onChange={(e) =>
                      setEditedDish({ ...editedDish, price: e.target.value })
                    }
                  />
                ) : (
                  dish.price
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <IngredientsComponent
                    ingredients={editedDish.ingredients}
                    handleIngredientChange={handleIngredientChange}
                  />
                ) : (
                  <ul>
                    {dish.ingredients.map((ingredient, i) => (
                      <li key={i}>
                        {ingredient.title} -{' '}
                        {ingredient.is_required ? 'Required' : 'Optional'}
                      </li>
                    ))}
                  </ul>
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <div className={styles.action_buttons}>
                    <Button variant="outlined" onClick={handleDishSave}>
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setEditingIndex(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => handleDishEdit(index)}>
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
          {editingIndex === null && (
            <tr>
              <td colSpan={8}>
                <Button variant="outlined" onClick={handleAddDish}>
                  Add Dish
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => getS3ImageUrl}>get</button>
    </section>
  );
};

export default DishManagement;
