import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectIsFetching,
  selectUser,
  selectRole,
} from '@/store/auth/selectors';
import { IUser } from '@/store/auth/slice';

interface AuthState {
  loggedIn: boolean;
  isFetching: boolean;
  user: IUser;
  role: string | null;
}
export const useAuth = (): AuthState => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const isFetching = useSelector(selectIsFetching);
  const user = useSelector(selectUser);
  const role = useSelector(selectRole);
  return {
    user,
    role,
    loggedIn,
    isFetching,
  };
};
