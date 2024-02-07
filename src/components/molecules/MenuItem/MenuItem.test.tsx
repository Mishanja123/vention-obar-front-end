import { render, fireEvent } from '@testing-library/react';
import MenuItem from './MenuItem';

describe('MenuItem component', () => {
  const dish = {
    id: 1,
    title: 'Spaghetti Carbonara',
    price: '12.99',
    photoPath: 'spaghetti.jpg',
  };

  test('renders component correctly', () => {
    const { getByText, getByAltText } = render(<MenuItem {...dish} />);

    expect(getByText('Spaghetti Carbonara')).toBeInTheDocument();
    expect(getByText('12.99$')).toBeInTheDocument();
    expect(getByAltText('Dish_picture')).toBeInTheDocument();
    expect(getByText('Add to cart')).toBeInTheDocument();
  });

  test('clicking "Add to cart" button triggers addToCart function', () => {
    const { getByText } = render(<MenuItem {...dish} />);
    const addToCartButton = getByText('Add to cart');

    fireEvent.click(addToCartButton);
  });
});
