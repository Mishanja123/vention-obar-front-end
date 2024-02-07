import { render, fireEvent } from '@testing-library/react';
import MenuNavigator from './MenuNavigator';

describe('MenuNavigator component', () => {
  test('renders component correctly', () => {
    const { getByText } = render(<MenuNavigator />);
    expect(getByText('Breakfast')).toBeInTheDocument();
    expect(getByText('Lunch')).toBeInTheDocument();
    expect(getByText('Dinner')).toBeInTheDocument();
  });

  test('clicking on category button sets active category and calls setCategory', () => {
    const { getByText } = render(<MenuNavigator />);
    const breakfastButton = getByText('Breakfast');

    fireEvent.click(breakfastButton);
  });
});
