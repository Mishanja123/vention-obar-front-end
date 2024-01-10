import { ReactNode, FC } from 'react';
import { useAuthContext } from '@/context/authContext';
import { PATHS } from '@/constants/paths';
import { useNavigate } from 'react-router-dom';

interface PrivatePageProps {
  children: ReactNode;
}

const PrivatePage: FC<PrivatePageProps> = ({ children }) => {
  const { loggedIn, isfetching } = useAuthContext();
  const navigate = useNavigate();

  return <>{loggedIn || isfetching ? children : navigate(PATHS.AUTH)}</>;
};

export default PrivatePage;
