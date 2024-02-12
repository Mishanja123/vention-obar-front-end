import { ReactNode, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import { useAuth } from '@/hooks/useAuth';

interface PublicPageProps {
  children: ReactNode;
}

const AdminRoute: FC<PublicPageProps> = ({ children }) => {
  const { loggedIn, role } = useAuth();
  const navigate = useNavigate();
  const admin = role === 'admin';
  useEffect(() => {
    if (loggedIn) {
      if (admin) {
        navigate(`${PATHS.ADMIN}/${PATHS.DISHMANAGEMENT}`);
      } else {
        navigate(PATHS.ROOT);
      }
    }
  }, [loggedIn, admin, navigate]);

  return <>{loggedIn ? children : null}</>;
};

export default AdminRoute;
