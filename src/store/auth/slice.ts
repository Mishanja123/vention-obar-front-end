import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './operations';
import Swal from 'sweetalert2';
export interface IUser {
  avatar: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
interface State {
  user: IUser | null;
  role: string | null;
  token: string | null;
  loggedIn: boolean;
  isFetching: boolean;
}

const initialState: State = {
  user: null,
  role: null,
  token: null,
  loggedIn: false,
  isFetching: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<State>) => {
    builder

      // Register //
      .addCase(register.fulfilled, (state) => {
        state.isFetching = false;
      })
      .addCase(register.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(register.rejected, (_, action) => {
        console.error('Registration failed:', action.error);
      })

      // Login //
      .addCase(login.fulfilled, (state, action) => {
        const { user, userCredentials } = action.payload;
        state.user = {
          ...user,
        };
        state.role = userCredentials.role;

        state.loggedIn = true;
        state.isFetching = false;
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(login.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(login.rejected, (state) => {
        state.isFetching = false;
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Login Failed',
          showConfirmButton: false,
          timer: 1500,
        });
      })

      // Logout //
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.role = null;
        state.loggedIn = false;
        state.isFetching = false;
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Logout Successful',
          text: 'See you soon!',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log('Successful Logout.');
      })
      .addCase(logout.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isFetching = false;
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Logout Failed',
          showConfirmButton: false,
          timer: 1500,
        });
        console.log('Something is wrong', action.error);
      })

      // Refresh //
      .addCase(refreshUser.fulfilled, (state, action) => {
        const { user, userCredentials } = action.payload;
        state.user = {
          ...user,
        };
        state.role = userCredentials.role;
        state.loggedIn = true;
        state.isFetching = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
