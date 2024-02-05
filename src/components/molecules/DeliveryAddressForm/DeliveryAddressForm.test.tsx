import { render } from '@testing-library/react';
import DeliveryAddressForm from './DeliveryAddressForm';

describe('DeliveryAddressForm component', () => {
  it('should render the form with initial state and Add Delivery Address button', () => {
    const { getByText } = render(<DeliveryAddressForm />);
    const addButton = getByText('Add Delivery Address');
    expect(addButton).toBeInTheDocument();
  });
});
