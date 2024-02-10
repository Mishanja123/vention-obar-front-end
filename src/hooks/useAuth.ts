import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectIsFetching,
  selectRole,
} from '@/store/auth/selectors';
// import { IUser } from '@/store/auth/slice';

interface AuthState {
  loggedIn: boolean;
  isFetching: boolean;
  role: string | null;
}
export const useAuth = (): AuthState => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const isFetching = useSelector(selectIsFetching);
  const role = useSelector(selectRole);
  return {
    role,
    loggedIn,
    isFetching,
  };
};
