import { Ingredients } from '@/types/dish';

import styles from './IngredientsComponent.module.css';

interface IngredientsProps {
  ingredients: Ingredients[];
  handleIngredientChange: (
    ingredientIndex: number,
    key: keyof Ingredients,
    value: string | boolean,
  ) => void;
}
const IngredientsComponent: React.FC<IngredientsProps> = ({
  ingredients,
  handleIngredientChange,
}) => {
  return (
    <ul>
      {ingredients.map((ingredient, ingredientIndex) => (
        <li key={ingredientIndex}>
          <input
            className={styles.dish_input}
            type="text"
            value={ingredient.title}
            onChange={(e) =>
              handleIngredientChange(ingredientIndex, 'title', e.target.value)
            }
          />
          <label className={styles.ingredient_label}>
            <p>Required:</p>
            <input
              type="checkbox"
              checked={ingredient.is_required}
              onChange={(e) =>
                handleIngredientChange(
                  ingredientIndex,
                  'is_required',
                  e.target.checked,
                )
              }
            />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default IngredientsComponent;
