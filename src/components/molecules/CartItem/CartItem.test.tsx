import { render, screen, fireEvent } from '@testing-library/react';
import CartItems from './CartItem';
import { DISHCATEGORY } from '@/constants/categoryDish';

const mockDish = {
  id: 1,
  photoPath: 'path/to/photo',
  title: 'Test Dish',
  price: '10$',
  quantity: 2,
  category: DISHCATEGORY.BAR_BLISS,
  ingredients: ['Ingredient 1', 'Ingredient 2'],
  weight_grams: 200,
};

describe('CartItem Component', () => {
  it('should render cart item details correctly', () => {
    render(
      <CartItems
        id={mockDish.id}
        photoPath={mockDish.photoPath}
        title={mockDish.title}
        price={mockDish.price}
        quantity={mockDish.quantity}
        category={mockDish.category}
        ingredients={[]}
        weight_grams={0}
      />,
    );

    expect(screen.getByText('Test Dish')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'avatar' })).toBeInTheDocument();
  });

  it('should call removeFromCartById when remove button is clicked', () => {
    const removeFromCartByIdMock = jest.fn();
    const mockDishWithHandler = {
      ...mockDish,
      removeFromCartById: removeFromCartByIdMock,
    };
    render(
      <CartItems
        id={mockDishWithHandler.id}
        photoPath={mockDishWithHandler.photoPath}
        title={mockDishWithHandler.title}
        price={mockDishWithHandler.price}
        quantity={mockDishWithHandler.quantity}
        category={mockDishWithHandler.category}
        ingredients={[]}
        weight_grams={0}
      />,
    );

    fireEvent.click(screen.getByTestId(1));

    expect(removeFromCartByIdMock).toHaveBeenCalledWith('1');
  });

  it('should call removeFromCartById when remove button is clicked via keyboard', () => {
    const removeFromCartByIdMock = jest.fn();
    const mockDishWithHandler = {
      ...mockDish,
      removeFromCartById: removeFromCartByIdMock,
    };
    render(
      <CartItems
        id={mockDishWithHandler.id}
        photoPath={mockDishWithHandler.photoPath}
        title={mockDishWithHandler.title}
        price={mockDishWithHandler.price}
        quantity={mockDishWithHandler.quantity}
        category={mockDishWithHandler.category}
        ingredients={[]}
        weight_grams={0}
      />,
    );

    fireEvent.keyDown(screen.getByTestId(1), {
      key: 'Enter',
    });

    expect(removeFromCartByIdMock).toHaveBeenCalledWith('1');
  });
});
