import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { useAuth } from './hooks/useAuth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from './redux/auth/operations';

function App() {
  const dispatch = useDispatch<any>();
  const { isFetching } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isFetching ? (
    <div>Loading</div>
  ) : (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
