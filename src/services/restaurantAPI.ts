import axios from 'axios';

const HOST = '18.156.198.73';

// const HOST = '3.120.224.255';

console.log(HOST);

export const axiosInstance = axios.create({
  baseURL: `http://${HOST}:3000/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;
