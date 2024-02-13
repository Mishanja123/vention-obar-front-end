import axios from 'axios';

const HOST = '54.93.51.4';

// const HOST = '3.120.224.255';

console.log(HOST);

export const axiosInstance = axios.create({
  baseURL: `https://${HOST}:3000/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;
