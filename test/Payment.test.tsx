import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Payment from '../src/components/molecules/Payment/Payment';
import { useFormik } from 'formik';
import { useCheckoutContext } from '../src/context/checkoutContext';

jest.mock('formik', () => ({
  useFormik: jest.fn(),
}));

jest.mock('@/context/checkoutContext', () => ({
  useCheckoutContext: jest.fn(),
}));

describe('Payment component', () => {
  beforeEach(() => {
    useFormik.mockReturnValue({
      handleSubmit: jest.fn(),
      handleChange: jest.fn(),
      values: {
        addressTitle: '',
        cardNumber: '',
        cardholder: '',
        cvvNumber: '',
        month: '',
        year: '',
      },
      errors: {},
      touched: {},
    });

    useCheckoutContext.mockReturnValue({
      handlePaymentCardAdditing: jest.fn(),
    });
  });

  it('renders without crashing', () => {
    render(<Payment />);
  });

  //   it('submits the form with correct data', () => {
  //     const { getByText, getByPlaceholderText, getByTitle } = render(<Payment />);

  //     const addressTitleInput = getByPlaceholderText('My main card');
  //     const cardNumberInput = getByPlaceholderText('1234 5678 9012 3456');
  //     const cardholderInput = getByPlaceholderText('Ex. John Doe');
  //     const cvvNumberInput = getByPlaceholderText('***');
  //     const monthSelect = getByRole('combobox', { name: 'Month' });
  //     const yearSelect = getByRole('combobox', { name: 'Year' });
  //     const submitButton = getByText('Edit / Save changes');

  //     fireEvent.change(addressTitleInput, { target: { value: 'Address' } });
  //     fireEvent.change(cardNumberInput, {
  //       target: { value: '1234567890123456' },
  //     });
  //     fireEvent.change(cardholderInput, { target: { value: 'Cardholder Name' } });
  //     fireEvent.change(cvvNumberInput, { target: { value: '123' } });
  //     fireEvent.change(monthSelect, { target: { value: '01' } });
  //     fireEvent.change(yearSelect, { target: { value: '2025' } });

  //     fireEvent.click(submitButton);

  //     expect(useCheckoutContext().handlePaymentCardAdditing).toHaveBeenCalledWith(
  //       'Address',
  //       '1234567890123456',
  //       'Cardholder Name',
  //       '123',
  //       '01',
  //       '2025',
  //     );
  //   });
});
