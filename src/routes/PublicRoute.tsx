import { ReactNode, FC } from 'react';
import { useAuthContext } from '@/context/authContext';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/constants/paths';

interface PublicPageProps {
  children: ReactNode;
}

const PublicPage: FC<PublicPageProps> = ({ children }) => {
  const { loggedIn } = useAuthContext();
  const navigate = useNavigate();

  return <>{!loggedIn ? children : navigate(PATHS.ROOT)}</>;
};

export default PublicPage;
