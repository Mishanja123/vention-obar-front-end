import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OrderMethodSelection from '../src/components/molecules/OrderMethodSelection/OrderMethodSelection';
import { BrowserRouter as Router } from 'react-router-dom';
import { useCheckoutContext } from '../src/context/checkoutContext';

jest.mock('@/context/checkoutContext', () => ({
  useCheckoutContext: jest.fn(),
}));

describe('OrderMethodSelection component', () => {
  beforeEach(() => {
    useCheckoutContext.mockReturnValue({
      setDeliveryOrTakeOut: jest.fn(),
    });
  });

  it('renders without crashing', () => {
    render(
      <Router>
        <OrderMethodSelection />
      </Router>,
    );
  });
});
