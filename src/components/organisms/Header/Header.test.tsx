import { render, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('menu button opens mobile menu when clicked', () => {
    const { getByTestId } = render(<Header />);
    const menuButton = getByTestId('menu-button');

    fireEvent.click(menuButton);

    const mobileMenu = getByTestId('mobile-menu');
    expect(mobileMenu).toBeInTheDocument();
  });
});
