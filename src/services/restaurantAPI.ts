import axios from 'axios';

const HOST = import.meta.env.VITE_DATABASE_HOST;

export const axiosInstance = axios.create({
  baseURL: `http://${HOST}:3000/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const setAccessToken = (accessToken: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const unsetAccessToken = () => {
  axiosInstance.defaults.headers.common.Authorization = '';
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status == 401) {
      try {
        const { headers } = await axiosInstance.get('/auth/refresh');
        const newAccessToken = headers.authorization.split(' ')[1];

        setAccessToken(newAccessToken);

        return await axiosInstance(error.config);
        // eslint-disable-next-line @typescript-eslint/no-shadow
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
