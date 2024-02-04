import { render, screen, fireEvent } from '@testing-library/react';
import CartItems from './CartItem';

const mockDish = {
  id: 1,
  photoPath: 'path/to/photo',
  title: 'Test Dish',
  price: '10',
  quantity: 2,
  category: 'Main Course',
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
      />,
    );

    // Проверяем отображение заголовка, цены и изображения
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
    render(<CartItems {...mockDishWithHandler} />);

    // Находим иконку удаления и эмулируем клик
    fireEvent.click(screen.getByRole('button', { name: 'trash' }));

    // Проверяем, что функция removeFromCartById вызывается с правильным аргументом
    expect(removeFromCartByIdMock).toHaveBeenCalledWith('1');
  });

  it('should call removeFromCartById when remove button is clicked via keyboard', () => {
    const removeFromCartByIdMock = jest.fn();
    const mockDishWithHandler = {
      ...mockDish,
      removeFromCartById: removeFromCartByIdMock,
    };
    render(<CartItems {...mockDishWithHandler} />);

    // Находим иконку удаления и эмулируем нажатие клавиши Enter
    fireEvent.keyDown(screen.getByRole('button', { name: 'trash' }), {
      key: 'Enter',
    });

    // Проверяем, что функция removeFromCartById вызывается с правильным аргументом
    expect(removeFromCartByIdMock).toHaveBeenCalledWith('1');
  });
});
