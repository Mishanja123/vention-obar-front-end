import SelectInput from './SelectInput';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
describe('code snippet', () => {
  it('should render select input element with empty string as placeholder when placeholder prop is not passed', () => {
    // Arrange
    const formik = {
      handleChange: jest.fn(),
      values: { name: 'option1' },
      errors: {},
      touched: {},
    };
    const name = 'name';
    const id = 'selectInput';
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];

    // Act
    render(
      //@ts-expect-error
      <SelectInput
        formik={formik}
        type={name}
        name={name}
        id={id}
        options={options}
      />,
    );

    // Assert
    expect(screen.getByRole('combobox')).toHaveAttribute('placeholder', '');
  });
});
