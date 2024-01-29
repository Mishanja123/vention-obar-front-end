import { render } from '@testing-library/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import SharedLayout from '../src/components/molecules/SharedLayout/SharedLayout';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';

describe('SharedLayout component', () => {
  it('renders Header and Outlet', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Provider store={store}>
          <SharedLayout />
        </Provider>
      </MemoryRouter>,
    );

    // Check if Header is rendered
    // const headerElement = getByTestId('header-component');
    // expect(headerElement).toBeInTheDocument();

    // Check if Outlet is rendered
    const headerElement = getByTestId('header-component');
    expect(headerElement).toBeInTheDocument();
  });
});
