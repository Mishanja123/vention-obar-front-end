import AdminPage from '@/pages/AdminPage/AdminPage';
import { PATHS } from '../constants/paths';
import {
  DishManagement,
  OrdersManagement,
  UserManagement,
} from '@/components/organisms';
import MenuProvider from '@/context/menuContext';

const adminRouter = [
  {
    path: PATHS.ADMIN,
    element: <AdminPage />,
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
      { path: PATHS.ORDERSMANAGEMENT, element: <OrdersManagement /> },
    ],
  },
];

export default adminRouter;
