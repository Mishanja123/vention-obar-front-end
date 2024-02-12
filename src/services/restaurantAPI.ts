import axios from 'axios';

const HOST = 3.74.215.241;

// const HOST = 'localhost';

console.log(HOST);

export const axiosInstance = axios.create({
  baseURL: `http://${HOST}:3000/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;
