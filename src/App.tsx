import { RouterProvider } from 'react-router-dom';
import router from './router/router';
function App() {
  // if (isFetchingCurrent) {
  //   return <Loader />;
  // }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
