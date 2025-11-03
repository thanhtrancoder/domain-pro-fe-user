// src/api/apiClient.ts
import axios, { type AxiosInstance } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    login?: boolean;
  }
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

apiClient.interceptors.request.use(config => {
  if (config.login !== true) {
    return config;
  }
  const token = localStorage.getItem('token');
  
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error.response.data);
  }
);

export default apiClient;
