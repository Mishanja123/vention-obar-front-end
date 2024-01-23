import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/services/restaurantAPI';
import { setToken } from './slice';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
interface LoginData {
  email: string;
  password: string;
}

export const setAccessToken = (accessToken: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const unsetAccessToken = () => {
  axiosInstance.defaults.headers.common.Authorization = '';
};
/*
 * POST @ /auth/register
 * body: { name, email, phone, password, }
 */
export const register = createAsyncThunk(
  '/auth/sign-up',
  async (
    { firstName, lastName, email, phone, password }: RegisterData,
    thunkAPI,
  ) => {
    try {
      const { data } = await axiosInstance.post('/auth/sign-up', {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/*
 * POST @  /auth/login
 * body: { email, password }
 */
export const login = createAsyncThunk(
  '/auth/login',
  async ({ email, password }: LoginData, thunkAPI) => {
    try {
      const { data, headers } = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

      const accessToken = headers.authorization.split(' ')[1];
      setAccessToken(accessToken);
      thunkAPI.dispatch(setToken(accessToken));

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/*
 * get @ /auth/logout
 * headers: Authorization: Bearer token +
 */
export const logout = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    await axiosInstance.get('/auth/logout');
    unsetAccessToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const { headers } = await axiosInstance.get('/auth/refresh');

      const newAccessToken = headers.authorization.split(' ')[1];

      thunkAPI.dispatch(setToken(newAccessToken));

      setAccessToken(newAccessToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
