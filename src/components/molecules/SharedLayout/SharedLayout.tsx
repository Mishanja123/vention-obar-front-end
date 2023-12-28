import { Outlet } from 'react-router-dom';

import { Header } from '../index.ts';
import { Footer } from '../index.ts';

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
