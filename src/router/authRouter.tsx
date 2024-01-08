import { PATHS } from '../constants/paths';

import PrivatePage from '../routes/PrivateRoute';
import AuthPage from '../pages/AuthPage/AuthPage';
import { LoginForm, RegistrationForm } from '@/components/molecules';

const authRoutes = [
  {
    path: PATHS.AUTH,
    element: (
      <PrivatePage>
        <AuthPage />
      </PrivatePage>
    ),
    children: [
      {
        path: PATHS.AUTH,
        element: <RegistrationForm />,
      },
      { path: PATHS.LOGIN, element: <LoginForm /> },
    ],
  },
];

export default authRoutes;
