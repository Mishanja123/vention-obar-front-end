import { RootState } from '@/store/store';
export const selectIsLoggedIn = (state: RootState) => state.auth.loggedIn;
export const selectResponse = (state: RootState) => state.auth.response;
export const selectIsFetching = (state: RootState) => state.auth.isFetching;
