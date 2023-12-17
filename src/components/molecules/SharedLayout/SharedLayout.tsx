import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <div>
      SharedLayout
      <Outlet />
    </div>
  );
};

export default SharedLayout;
