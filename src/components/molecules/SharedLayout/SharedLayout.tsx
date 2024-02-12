import { Outlet } from 'react-router-dom';

import { Header } from '@/components/organisms';

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default SharedLayout;
