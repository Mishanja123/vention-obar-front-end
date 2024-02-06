import { render, screen, fireEvent } from '@testing-library/react';
import CartItems from './CartItem';

const testProps = {
  photoPath: 'photoPath',
  title: 'test',
  price: '20',
  quantity: 0,
  id: 1,
};
describe('CartItem Component', () => {
  it('CartItem renders', () => {
    render(<CartItems {...testProps} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByTestId('1')).toBeInTheDocument();
  });
  it('should call handleRemoveFromCart when trash icon is clicked', () => {
    const removeFromCartByIdMock = jest.fn();

    const { getByTestId } = render(<CartItems {...testProps} />);
    const trashBtn = getByTestId('1');

    fireEvent.click(trashBtn);

    expect(removeFromCartByIdMock).toHaveBeenCalledWith(1);
  });
});
