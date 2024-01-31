import React from 'react';
import { render } from '@testing-library/react';
import OrderedReservarionForm from '../src/components/molecules/OrderedReservarionForm/OrderedReservarionForm';

jest.mock('../src/components/molecules/ReservationForm/ReservationForm', () => {
  return () => (
    <div data-testid="mocked-reservation-form">Mocked Reservation Form</div>
  );
});

describe('OrderedReservarionForm component', () => {
  it('renders without crashing', () => {
    render(<OrderedReservarionForm />);
  });

  it('renders the mocked ReservationForm component', () => {
    const { getByTestId } = render(<OrderedReservarionForm />);
    expect(getByTestId('mocked-reservation-form')).toBeInTheDocument();
  });
});
