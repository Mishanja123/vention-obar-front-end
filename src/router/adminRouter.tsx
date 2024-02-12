import AdminPage from '@/pages/AdminPage/AdminPage';
import { PATHS } from '../constants/paths';
import {
  DishManagement,
  OrderManagement,
  UserManagement,
} from '@/components/organisms';
import MenuProvider from '@/context/menuContext';
import PrivatePage from '@/routes/PrivateRoute';
import AdminRoute from '@/routes/AdminRoute';

const adminRouter = [
  {
    path: PATHS.ADMIN,
    element: (
      <PrivatePage>
        <AdminRoute>
          <AdminPage />
        </AdminRoute>
      </PrivatePage>
    ),
    children: [
      {
        path: PATHS.DISHMANAGEMENT,
        element: (
          <MenuProvider>
            <DishManagement />
          </MenuProvider>
        ),
      },
      { path: PATHS.USERMANAGEMENT, element: <UserManagement /> },
      { path: PATHS.ORDERSMANAGEMENT, element: <OrderManagement /> },
    ],
  },
];

export default adminRouter;
