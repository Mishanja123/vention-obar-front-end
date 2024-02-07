import { ReactNode, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';
import { useAuth } from '@/hooks/useAuth';

interface PrivatePageProps {
  children: ReactNode;
}

const PrivatePage: FC<PrivatePageProps> = ({ children }) => {
  const { loggedIn, isFetching } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn && !isFetching) {
      navigate(PATHS.AUTH);
    }
  }, [loggedIn, isFetching, navigate]);

  return <>{loggedIn ? children : null}</>;
};

export default PrivatePage;
