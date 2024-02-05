import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import OrderConfirmation from '../src/components/molecules/OrderConfirmation/OrderConfirmation';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

const mockCartItems = {
  dishes: [
    {
      dishData: { id: 1, photo_path: 'dish1.jpg', title: 'Dish 1' },
      quantity: 2,
      subtotal: 20,
    },
    {
      dishData: { id: 2, photo_path: 'dish2.jpg', title: 'Dish 2' },
      quantity: 1,
      subtotal: 10,
    },
  ],
};

const mockOrderData = {
  order_date: '2024-01-28 12:00:00',
  type: 'delivery',
};

const mockTableGuests = 2;

const mockDeleteOrder = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@/context/checkoutContext', () => ({
  useCheckoutContext: () => ({
    orderData: mockOrderData,
    handleDeleteOrder: mockDeleteOrder,
    tableGuests: mockTableGuests,
  }),
}));

jest.mock('@/context/cartContext', () => ({
  useCartContext: () => ({
    cartItems: mockCartItems,
  }),
}));

describe('OrderConfirmation component', () => {
  it('renders without crashing', () => {
    render(<OrderConfirmation />);
  });

  it('displays correct order information', () => {
    const { getByText } = render(<OrderConfirmation />);
    expect(
      getByText(/Your order will be delivered on 2024-01-28 at 12:00/),
    ).toBeInTheDocument();
    expect(getByText(/Dish 1/)).toBeInTheDocument();
    expect(getByText(/Dish 2/)).toBeInTheDocument();
  });

  it('handles cancellation correctly', async () => {
    const { getByText } = render(<OrderConfirmation />);
    const mockSwalFire = jest
      .spyOn(Swal, 'fire')
      .mockResolvedValue({ isConfirmed: false });

    fireEvent.click(getByText('Cancel'));
    await waitFor(() => {
      expect(mockDeleteOrder).toHaveBeenCalled();
    });
  });
});
