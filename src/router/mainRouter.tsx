import {
  DeliveryAddressForm,
  MenuItem,
  Payment,
  SharedLayout,
  UserInfoForm
} from "../components/molecules";

import AccountPage from "../pages/AccountPage";
import CartPage from "../pages/CartPage";
import ErrorPage from "../pages/ErrorPage";
import MainPage from "../pages/MainPage";
import MenuPage from "../pages/MenuPage";

import { PATHS } from "../constants/paths";

import PrivatePage from "../routes/PrivateRoute";

const mainRoutes = [
  {
    path: PATHS.ROOT,
    element: (
      <PrivatePage>
        <SharedLayout />
      </PrivatePage>
    ),
    children: [
      { path: PATHS.HOME, element: <MainPage /> },
      { path: PATHS.MENU, element: <MenuPage /> },
      { path: PATHS.MENUITEM, element: <MenuItem /> },
      { path: PATHS.CART, element: <CartPage /> },
      {
        path: PATHS.ACCOUNT,
        element: <AccountPage />,
        children: [
          { path: PATHS.USER_INFO, element: <UserInfoForm /> },
          { path: PATHS.DELIVERY_ADDRESS, element: <DeliveryAddressForm /> },
          { path: PATHS.PAYMENT, element: <Payment /> }
        ]
      }
    ]
  },
  { path: "*", element: <ErrorPage /> }
];

export default mainRoutes;
