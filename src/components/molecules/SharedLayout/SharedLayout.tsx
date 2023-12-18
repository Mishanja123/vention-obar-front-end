import { Outlet } from 'react-router-dom';

import Header from '../Header/Header.tsx';

const SharedLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
