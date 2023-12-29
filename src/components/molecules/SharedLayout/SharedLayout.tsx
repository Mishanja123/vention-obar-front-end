import { Outlet } from 'react-router-dom';

import { Header } from '../index.ts';

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default SharedLayout;
