import TimePickerContainer from '../src/components/molecules/TimePickerContainer/TimePickerContainer';
import { render } from '@testing-library/react';

describe('TimePickerContainer test', () => {
  test('should render content', () => {
    //@ts-ignore
    const { getByText } = render(<TimePickerContainer />);

    expect(getByText('TimePickerContainer')).toBeInTheDocument();
  });
});
