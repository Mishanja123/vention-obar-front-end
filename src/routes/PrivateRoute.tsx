import { ReactNode, FC, useEffect } from 'react';
import { useAuthContext } from '@/context/authContext';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';

interface PrivatePageProps {
  children: ReactNode;
}

const PrivatePage: FC<PrivatePageProps> = ({ children }) => {
  const { loggedIn, isfetching } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate(PATHS.AUTH);
    }
  }, [loggedIn, isfetching, navigate]);

  return <>{loggedIn || isfetching ? children : null}</>;
};

export default PrivatePage;
