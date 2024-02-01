import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from './store/auth/operations';
import { RootState, TypedDispatch } from './store/store';
import { useAuth } from './hooks/useAuth';

function App() {
  const dispatch = useDispatch<TypedDispatch<RootState>>();
  const { isFetching } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isFetching ? (
    <>
      <p>Loading</p>
    </>
  ) : (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
