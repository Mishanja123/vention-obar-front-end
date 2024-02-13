import axios from 'axios';

// const HOST = import.meta.env.VITE_BACKEND_HOST; //create env file with this naming

const HOST = '54.93.51.4';

export const s3axiosInstance = axios.create({
  baseURL: `https://${HOST}:3000/api`,
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true,
});

export default s3axiosInstance;
