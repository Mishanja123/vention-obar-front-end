import { PATHS } from "../constants/paths";

import PrivatePage from "../routes/PrivateRoute";
import AuthPage from "../pages/AuthPage/AuthPage";

const authRoutes = [
  {
    path: PATHS.AUTH,
    element: (
      <PrivatePage>
        <AuthPage />
      </PrivatePage>
    )
  }
];

export default authRoutes;
