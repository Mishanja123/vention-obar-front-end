import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshUser } from './store/auth/operations';
import { RootState, TypedDispatch } from './store/store';

function App() {
  const dispatch = useDispatch<TypedDispatch<RootState>>();
  const { isFetching } = useAuth();

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
