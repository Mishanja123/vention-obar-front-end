import axios from 'axios';

// const HOST = import.meta.env.VITE_BACKEND_HOST; //create env file with this naming
const HOST = 'localhost';
export const axiosInstance = axios.create({
  baseURL: `http://${HOST}:3000/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;
