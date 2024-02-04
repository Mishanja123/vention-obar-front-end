import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route } from 'react-router-dom';
import authRoutes from './authRouter';
import { PATHS } from '../constants/paths';

describe('AuthRoutes', () => {
  test('renders AuthPage and RegistrationForm route', async () => {
    render(
      <MemoryRouter initialEntries={[PATHS.AUTH]}>
        <Route path={PATHS.AUTH} element={authRoutes[0].element}>
          {authRoutes[0].children.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      </MemoryRouter>,
    );

    // Check if AuthPage is rendered
    expect(screen.getByText(/Auth Page/i)).toBeInTheDocument();

    // Navigate to RegistrationForm route
    userEvent.click(screen.getByRole('link', { name: /Registration Form/i }));

    // Check if RegistrationForm is rendered
    expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
  });

  test('renders LoginForm route', async () => {
    render(
      <MemoryRouter initialEntries={[PATHS.LOGIN]}>
        <Route path={PATHS.AUTH} element={authRoutes[0].element}>
          {authRoutes[0].children.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      </MemoryRouter>,
    );

    // Navigate to LoginForm route
    userEvent.click(screen.getByRole('link', { name: /Login/i }));

    // Check if LoginForm is rendered
    expect(screen.getByText(/Login Form/i)).toBeInTheDocument();
  });
});
