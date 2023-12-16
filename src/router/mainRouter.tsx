import {
  DeliveryAddressForm,
  MenuItem,
  OrderConfirmation,
  OrderedReservarionForm,
  Payment,
  SharedLayout,
  UserInfoForm,
} from '../components/molecules';

import AccountPage from '../pages/AccountPage/AccountPage';
import CartPage from '../pages/CartPage';
import ErrorPage from '../pages/ErrorPage';
import MainPage from '../pages/MainPage/MainPage';
import MenuPage from '../pages/MenuPage';

import { PATHS } from '../constants/paths';

import PrivatePage from '../routes/PrivateRoute';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import OrdersPage from '../pages/OrdersPage';
import { OrderTakeout } from '../components/organisms';

const mainRoutes = [
  {
    path: PATHS.ROOT,
    element: (
      <PrivatePage>
        <SharedLayout />
      </PrivatePage>
    ),
    children: [
      { path: PATHS.ROOT, element: <MainPage /> },
      { path: PATHS.MENU, element: <MenuPage /> },
      { path: PATHS.MENU_ITEM, element: <MenuItem /> },
      { path: PATHS.CART, element: <CartPage /> },
      {
        path: PATHS.ACCOUNT,
        element: <AccountPage />,
        children: [
          { path: PATHS.USER_INFO, element: <UserInfoForm /> },
          { path: PATHS.DELIVERY_ADDRESS, element: <DeliveryAddressForm /> },
          { path: PATHS.PAYMENT, element: <Payment /> },
        ],
      },
      {
        path: PATHS.CHECKOUT,
        element: <CheckoutPage />,
        children: [
          { path: PATHS.BOOK_TABLE, element: <OrderedReservarionForm /> },
          { path: PATHS.DELIVERY, element: <DeliveryAddressForm /> },
          {
            path: PATHS.TAKEOUT,
            element: <OrderTakeout />,
          },
          { path: PATHS.ORDER_PAYMENT, element: <Payment /> },
          { path: PATHS.ORDER_CONFIRMATION, element: <OrderConfirmation /> },
        ],
      },
      {
        path: PATHS.ORDERS,
        element: <OrdersPage />,
      },
    ],
  },
  { path: '*', element: <ErrorPage /> },
];

export default mainRoutes;
