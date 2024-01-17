import { ReactNode, FC, useEffect } from 'react';
import { useAuthContext } from '@/context/authContext';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';

interface PublicPageProps {
  children: ReactNode;
}

const PublicPage: FC<PublicPageProps> = ({ children }) => {
  const { loggedIn, isfetching } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn || isfetching) {
      navigate(PATHS.ROOT);
    }
  }, [loggedIn, isfetching, navigate]);

  return <>{!loggedIn && !isfetching ? children : null}</>;
};

export default PublicPage;
