import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/services/restaurantAPI';
import { setToken } from './slice';
import { RootState } from '@/store/store';

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

export const register = createAsyncThunk(
  '/auth/sign-up',
  async (
    { firstName, lastName, email, phone, password }: RegisterData,
    thunkAPI,
  ) => {
    try {
      await axiosInstance.post('/auth/sign-up', {
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      return 'all good';
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

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
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
  try {
    await axiosInstance.get('/auth/logout');
    unsetAccessToken();
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI: RootState) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const { headers } = await axiosInstance.get('/auth/refresh');

      const newAccessToken = headers.authorization.split(' ')[1];

      setAccessToken(newAccessToken);
      thunkAPI.dispatch(setToken(newAccessToken));
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
