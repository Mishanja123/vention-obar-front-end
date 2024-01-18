import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectResponse,
  selectIsFetching,
} from '@/redux/auth/selectors';

export const useAuth = () => {
  const loggedIn = useSelector(selectIsLoggedIn);
  const response = useSelector(selectResponse);
  const isFetching = useSelector(selectIsFetching);
  return {
    loggedIn,
    response,
    isFetching,
  };
};
