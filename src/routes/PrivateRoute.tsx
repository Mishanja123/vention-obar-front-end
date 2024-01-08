import { ReactNode, FC } from 'react';
import { useAuthContext } from '@/context/authContext';

interface PrivatePageProps {
  children: ReactNode;
}

const PrivatePage: FC<PrivatePageProps> = ({ children }) => {
  const { loggedIn } = useAuthContext();

  return <>{loggedIn ? children : null}</>;
};

export default PrivatePage;
