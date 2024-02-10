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
  DishDetails,
  MenuList,
  OrderDelivery,
  OrderTakeout,
} from '../components/organisms';
import OrderPayment from '@/components/organisms/OrderPayment/OrderPayment';
import NotFoundPage from '@/pages/NotFoundPage';
import { CheckoutProvider } from '@/context/checkoutContext';
import CartProvider from '../context/cartContext';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallbackComponent from '@/components/ErrorFallbackComponent/ErrorFallbackComponent';
import AdminRoute from '@/routes/AdminRoute';

const mainRoutes = [
  {
    path: PATHS.ROOT,
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
        <PrivatePage>
          <AdminRoute>
            <CartProvider>
              <SharedLayout />
            </CartProvider>
          </AdminRoute>
        </PrivatePage>
      </ErrorBoundary>
    ),
    children: [
      {
        path: PATHS.ROOT,
        element: (
          <CheckoutProvider>
            <MainPage />
          </CheckoutProvider>
        ),
      },
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
            element: <DishDetails />,
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
