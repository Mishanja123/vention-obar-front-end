import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import AuthProvider from './context/authContext';

function App() {
  // if (isFetchingCurrent) {
  //   return <Loader />;
  // }

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
