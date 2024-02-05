import { render, screen } from '@testing-library/react';
//@ts-expect-error
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import adminRouter from './adminRouter';
import { PATHS } from '../constants/paths';

describe('AdminRouter', () => {
  test('renders AdminPage and DishManagement route', async () => {
    render(
      <MemoryRouter initialEntries={[PATHS.ADMIN]}>
        <Route path={PATHS.ADMIN} element={adminRouter[0].element}>
          {adminRouter[0].children.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      </MemoryRouter>,
    );

    // Navigate to DishManagement route
    userEvent.click(screen.getByRole('link', { name: /Dish Management/i }));

    // Check if DishManagement is rendered
    expect(screen.getByText(PATHS.DISHMANAGEMENT)).toBeInTheDocument();
  });
});
