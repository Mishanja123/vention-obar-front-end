import { render, fireEvent, waitFor } from '@testing-library/react';
import DateAndTimePicker from './DateAndTimePicker';

describe('DateAndTimePicker component', () => {
  test('should render DateAndTimePicker component', () => {
    const { getByText } = render(<DateAndTimePicker />);
    const reserveButton = getByText('Reserve');
    expect(reserveButton).toBeInTheDocument();
  });

  test('should submit form with valid date and time', async () => {
    const mockSendDeliveryOrTakeOut = jest.fn();
    const mockNavigate = jest.fn();

    const { getByText, getByLabelText } = render(<DateAndTimePicker />);

    fireEvent.change(getByLabelText('Date'), {
      target: { value: '02/05/2024' },
    });
    fireEvent.change(getByLabelText('Time'), { target: { value: '10:00' } });

    fireEvent.click(getByText('Reserve'));

    await waitFor(() => {
      expect(mockSendDeliveryOrTakeOut).toHaveBeenCalledWith(
        '02/05/2024',
        '10:00',
      );
      expect(mockNavigate).toHaveBeenCalledWith('/checkout/order-confirmation');
    });
  });
});
