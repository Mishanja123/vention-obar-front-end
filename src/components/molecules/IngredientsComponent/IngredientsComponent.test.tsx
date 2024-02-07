import { render } from '@testing-library/react';
import IngredientsComponent from './IngredientsComponent';

describe('IngredientsComponent', () => {
  const ingredients = [
    { title: 'Salt', is_required: true },
    { title: 'Pepper', is_required: false },
  ];

  const handleIngredientChange = jest.fn();

  test('renders component correctly', () => {
    const { getAllByRole } = render(
      <IngredientsComponent
        ingredients={ingredients}
        handleIngredientChange={handleIngredientChange}
      />,
    );

    // Check if checkboxes are rendered
    const checkboxes = getAllByRole('checkbox');
    expect(checkboxes.length).toBe(ingredients.length);
  });
});
