import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from './Icon';

describe('Icon component', () => {
  it('renders the correct icon based on the provided iconName', () => {
    const iconName = 'people';
    const { container } = render(<Icon iconName={iconName} />);

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('handles the case when the provided iconName is not found', () => {
    const iconName = 'nonExistingIcon';
    const consoleErrorSpy = jest.spyOn(console, 'error');

    // Render the component with the non-existing iconName
    render(<Icon iconName={iconName} />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(`Icon ${iconName} not found`);

    consoleErrorSpy.mockRestore();
  });
});
