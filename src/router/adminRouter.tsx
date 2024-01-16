import AdminPage from '@/pages/AdminPage/AdminPage';
import { PATHS } from '../constants/paths';
import {
  DishManagement,
  OrderManagement,
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
      { path: PATHS.ORDERSMANAGEMENT, element: <OrderManagement /> },
    ],
  },
];

export default adminRouter;
