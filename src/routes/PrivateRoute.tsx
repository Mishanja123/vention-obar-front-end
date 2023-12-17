import { ReactNode, FC, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivatePageProps {
  children: ReactNode;
  redirectTo?: string;
}

const PrivatePage: FC<PrivatePageProps> = ({
  children,
  redirectTo = '/auth',
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
};

export default PrivatePage;
