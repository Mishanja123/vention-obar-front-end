import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import AuthProvider from './context/authContext';
import CartProvider from './context/cartContext';

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
