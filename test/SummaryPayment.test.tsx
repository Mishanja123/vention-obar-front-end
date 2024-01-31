import React from 'react';
import { render } from '@testing-library/react';
import SummaryPayment from '../src/components/molecules/SummaryPayment/SummaryPayment';

describe('SummaryPayment test', () => {
  test('renders summary payment component with correct values', () => {
    const quantity = 3;
    const subtotal = 25.5;
    const total = 30.0;

    const { getByText } = render(
      <SummaryPayment quantity={quantity} subtotal={subtotal} total={total}>
        <div>Additional content</div>
      </SummaryPayment>,
    );

    expect(getByText('Quantity:')).toBeInTheDocument();
    expect(getByText('Subtotal:')).toBeInTheDocument();
    expect(getByText('Total:')).toBeInTheDocument();

    expect(getByText(quantity.toString())).toBeInTheDocument();
    expect(getByText(subtotal.toFixed(2))).toBeInTheDocument();
    expect(getByText(total.toFixed(2))).toBeInTheDocument();
    expect(getByText('Additional content')).toBeInTheDocument();
  });
});
