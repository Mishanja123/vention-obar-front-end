// import { RootState } from '@/redux/store';

export const selectIsLoggedIn = (state) => state.auth.loggedIn;
export const selectResponse = (state) => state.auth.response;
export const selectIsFetching = (state) => state.auth.isFetching;
