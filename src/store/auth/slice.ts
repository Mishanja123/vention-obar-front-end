import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './operations';

interface State {
  token: string | null;
  loggedIn: boolean;
  isFetching: boolean;
}

const initialState: State = {
  token: null,
  loggedIn: false,
  isFetching: false,
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
        state.loggedIn = true;
        state.isFetching = false;

        console.log('Successful Registred.');
      })
      .addCase(register.rejected, (_, action) => {
        console.error('Registration failed:', action.error);
      })

      // Login //
      .addCase(login.fulfilled, (state) => {
        state.loggedIn = true;
        state.isFetching = false;
        console.log('Successful Logged in.');
      })
      .addCase(login.rejected, (_, action) => {
        console.error('Login failed:', action.error);
      })

      // Logout //
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.loggedIn = false;
        state.isFetching = false;
        console.log('Successful Logout.');
      })
      .addCase(logout.rejected, () => {
        console.log('Something is wrong');
      })

      // Refresh //
      .addCase(refreshUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(refreshUser.fulfilled, (state) => {
        state.loggedIn = true;
        state.isFetching = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isFetching = false;
      });
  },
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
