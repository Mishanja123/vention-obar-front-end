import { ReactNode, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import { useAuth } from '@/hooks/useAuth';

interface PublicPageProps {
  children: ReactNode;
}

const PublicPage: FC<PublicPageProps> = ({ children }) => {
  const { loggedIn, isFetching, role } = useAuth();
  const navigate = useNavigate();
  const user = role === 'user';
  useEffect(() => {
    if (!isFetching) {
      return;
    }

    if (loggedIn) {
      if (user) {
        navigate(PATHS.ROOT);
      } else {
        navigate(PATHS.ADMIN);
      }
    }
  }, [loggedIn, user, isFetching, navigate]);

  return <>{!loggedIn ? children : null}</>;
};

export default PublicPage;
