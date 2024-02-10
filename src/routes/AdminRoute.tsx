import { ReactNode, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import { useAuth } from '@/hooks/useAuth';

interface PublicPageProps {
  children: ReactNode;
}

const AdminRoute: FC<PublicPageProps> = ({ children }) => {
  const { loggedIn, isFetching, role } = useAuth();
  const navigate = useNavigate();
  const admin = role === 'admin';
  console.log(admin);
  useEffect(() => {
    if (isFetching) {
      return;
    }

    if (loggedIn) {
      if (admin) {
        navigate(PATHS.ADMIN);
      } else {
        navigate(PATHS.ROOT);
      }
    }
  }, [loggedIn, isFetching, admin, navigate]);

  return <>{loggedIn ? children : null}</>;
};

export default AdminRoute;
