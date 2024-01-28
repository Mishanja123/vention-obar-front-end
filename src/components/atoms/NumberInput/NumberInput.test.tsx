import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { NumberInput } from '..';
describe('code snippet', () => {
  it('should render a number input field with a default value of 0', () => {
    const formik = {
      values: { guests: 0 },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      errors: {},
      touched: {},
    };

    render(<NumberInput formik={formik} name="guests" />);

    const input = screen.getByRole('spinbutton');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(0);
  });

  // Allows the user to input a number value.
  it('should allow the user to input a number value', () => {
    const formik = {
      values: { guests: 0 },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      errors: {},
      touched: {},
    };

    render(<NumberInput formik={formik} name="guests" />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '5' } });

    expect(formik.handleChange).toHaveBeenCalledTimes(1);
    expect(formik.handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  // Updates the formik values when the user inputs a value.
  it('should update the formik values when the user inputs a value', () => {
    const formik = {
      values: { guests: 0 },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      errors: {},
      touched: {},
    };

    render(<NumberInput formik={formik} name="guests" />);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '5' } });

    expect(formik.handleChange).toHaveBeenCalledTimes(1);
    expect(formik.handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  // Renders a number input field with a value of 0 when the formik value for the input field is undefined.
  it('should render a number input field with a value of 0 when the formik value for the input field is undefined', () => {
    const formik = {
      values: {},
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      errors: {},
      touched: {},
    };

    render(<NumberInput formik={formik} name="guests" />);

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(0);
  });

  // Renders a number input field with a value of 0 when the formik value for the input field is null.
  it('should render a number input field with a value of 0 when the formik value for the input field is null', () => {
    const formik = {
      values: { guests: null },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      errors: {},
      touched: {},
    };

    render(<NumberInput formik={formik} name="guests" />);

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(0);
  });
});
