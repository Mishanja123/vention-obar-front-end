import axios from 'axios';

const HOST = process.env.BASE_URL;

// const HOST = '3.120.224.255';

console.log(HOST);

export const axiosInstance = axios.create({
  baseURL: `http://${HOST}:3000/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;
