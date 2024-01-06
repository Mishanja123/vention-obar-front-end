import { ReactNode, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/authContext';
import { PATHS } from '@/constants/paths';

interface PrivatePageProps {
  children: ReactNode;
}

const PrivatePage: FC<PrivatePageProps> = ({ children }) => {
  const { loggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate(PATHS.AUTH);
    } else {
      navigate(PATHS.ROOT);
    }
  }, [loggedIn, navigate]);

  return children;
};

export default PrivatePage;
