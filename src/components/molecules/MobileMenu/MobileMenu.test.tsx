import { render, fireEvent } from '@testing-library/react';
import MobileMenu from './MobileMenu';

describe('MobileMenu component', () => {
  test('renders component correctly', () => {
    const onClose = jest.fn();
    const { getByAltText, getByRole } = render(
      <MobileMenu onClose={onClose} isMenuOpen={true} />,
    );

    // Check if logo is rendered
    expect(getByAltText('logo')).toBeInTheDocument();

    // Check if close button is rendered
    const closeButton = getByRole('button');
    expect(closeButton).toBeInTheDocument();
  });

  test('clicking close button triggers onClose function', () => {
    const onClose = jest.fn();
    const { getByRole } = render(
      <MobileMenu onClose={onClose} isMenuOpen={true} />,
    );

    // Click the close button
    const closeButton = getByRole('button');
    fireEvent.click(closeButton);

    // Check if onClose function is called
    expect(onClose).toHaveBeenCalled();
  });
});
