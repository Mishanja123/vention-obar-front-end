import { ReactNode, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import { useAuth } from '@/hooks/useAuth';

interface PublicPageProps {
  children: ReactNode;
}

const PublicPage: FC<PublicPageProps> = ({ children }) => {
  const { loggedIn, isFetching } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn || isFetching) {
      navigate(PATHS.ROOT);
    }
  }, [loggedIn, isFetching, navigate]);

  return <>{!loggedIn && !isFetching ? children : null}</>;
};

export default PublicPage;
