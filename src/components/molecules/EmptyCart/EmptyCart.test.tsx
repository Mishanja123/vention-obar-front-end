import { render, fireEvent } from '@testing-library/react';
import EmptyCart from './EmptyCart';

describe('EmptyCart component', () => {
  test('renders component correctly', () => {
    const { getByAltText, getByText } = render(<EmptyCart />);

    expect(getByAltText('cart')).toBeInTheDocument();
    expect(getByText('Ooops! Your cart is empty')).toBeInTheDocument();
    expect(
      getByText(
        'Uh-oh! Your cart is feeling a bit lonely—time to fill it up with goodies and turn those empty cart blues into a shopping spree symphony!',
      ),
    ).toBeInTheDocument();
    expect(getByText('Go to Menu')).toBeInTheDocument();
  });

  test('clicking button calls handleButtonClick function', () => {
    const { getByText } = render(<EmptyCart />);
    const button = getByText('Go to Menu');
    const mockHandleButtonClick = jest.fn();

    fireEvent.click(button);

    expect(mockHandleButtonClick).toHaveBeenCalled();
  });
});
