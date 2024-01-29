import axios from 'axios';

// const HOST = import.meta.env.BASE_URL;

export const axiosInstance = axios.create({
  baseURL: `http://3.79.8.219:3000/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;
