import React from 'react';
import { render } from '@testing-library/react';
import mainRoutes from '../src/router/mainRouter';
import { BrowserRouter } from 'react-router-dom';

//@ts-expect-error
describe('App tests', () => {
  //@ts-expect-error
  test('renders main routes without crashing', () => {
    render(
      <BrowserRouter>
        {mainRoutes.map((route) => (
          <React.Fragment key={route.path}>{route.element}</React.Fragment>
        ))}
      </BrowserRouter>,
    );
  });
});
