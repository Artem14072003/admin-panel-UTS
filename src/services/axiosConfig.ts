import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  baseURL: 'http://localhost:8000',
});

export default axiosInstance;