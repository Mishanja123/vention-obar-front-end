import PublicPage from '@/routes/PublicRoute';
import { PATHS } from '../constants/paths';

import AuthPage from '../pages/AuthPage/AuthPage';
import { LoginForm, RegistrationForm } from '@/components/molecules';

const authRoutes = [
  {
    path: PATHS.AUTH,
    element: (
      <PublicPage>
        <AuthPage />
      </PublicPage>
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
