import {
  DeliveryAddressForm,
  OrderConfirmation,
  OrderedReservarionForm,
  Payment,
  SharedLayout,
  UserInfoForm,
} from '../components/molecules';

import AccountPage from '../pages/AccountPage/AccountPage';
import CartPage from '../pages/CartPage/CartPage';
import MainPage from '../pages/MainPage/MainPage';
import MenuPage from '../pages/MenuPage';

import { PATHS } from '../constants/paths';

import PrivatePage from '../routes/PrivateRoute';
import CheckoutPage from '../pages/CheckoutPage/CheckoutPage';
import OrdersPage from '../pages/OrdersPage/OrdersPage';
import {
  MenuItemInfo,
  MenuList,
  OrderDelivery,
  OrderTakeout,
} from '../components/organisms';
import OrderPayment from '@/components/organisms/OrderPayment/OrderPayment';
import NotFoundPage from '@/pages/NotFoundPage';
import { CheckoutProvider } from '@/context/checkoutContext';

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
      {
        path: PATHS.MENU,
        element: <MenuPage />,
        children: [
          {
            path: PATHS.MENU,
            element: <MenuList />,
          },
          {
            path: `${PATHS.MENU_ITEM}:id`,
            element: <MenuItemInfo />,
          },
        ],
      },

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
        element: (
          <CheckoutProvider>
            <CheckoutPage />
          </CheckoutProvider>
        ),
        children: [
          { path: PATHS.BOOK_TABLE, element: <OrderedReservarionForm /> },
          { path: PATHS.DELIVERY, element: <OrderDelivery /> },
          {
            path: PATHS.TAKEOUT,
            element: <OrderTakeout />,
          },
          { path: PATHS.ORDER_PAYMENT, element: <OrderPayment /> },
          { path: PATHS.ORDER_CONFIRMATION, element: <OrderConfirmation /> },
        ],
      },
      {
        path: PATHS.ORDERS,
        element: <OrdersPage />,
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
];

export default mainRoutes;
