import axios from 'axios';

// const HOST = import.meta.env.VITE_BACKEND_HOST; //create env file with this naming

const HOST = 'localhost';
export const s3axiosInstance = axios.create({
  baseURL: `http://${HOST}:3000/api`,
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true,
});

export default s3axiosInstance;
