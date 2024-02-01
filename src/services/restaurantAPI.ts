import axios from 'axios';

// const HOST = import.meta.env.BASE_URL;

export const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;
