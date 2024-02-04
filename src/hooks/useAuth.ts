import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsFetching } from '@/store/auth/selectors';

interface AuthState {
  loggedIn: boolean;
  isFetching: boolean;
}
export const useAuth = (): AuthState => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const isFetching = useSelector(selectIsFetching);
  return {
    loggedIn,
    isFetching,
  };
};
