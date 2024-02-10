import { RootState } from '@/store/store';
export const selectIsLoggedIn = (state: RootState) => state.auth.loggedIn;
export const selectIsFetching = (state: RootState) => state.auth.isFetching;
export const selectRole = (state: RootState) => state.auth.role;
