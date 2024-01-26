import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from './redux/auth/operations';

function App() {
  // @ts-expect-error for now
  const dispatch = useDispatch<unknown>();

  useEffect(() => {
    // @ts-expect-error for now
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
