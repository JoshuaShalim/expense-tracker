// src/utils/axiosInstance.js
import axios from 'axios';

import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, // Increased timeout to 60 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Add retry logic
  retry: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // time interval between retries
  }
});

// Request Interceptor
// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor with retry logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;
    if (!config || !config.retry) {
      return Promise.reject(error);
    }

    config.retryCount = config.retryCount || 0;

    if (config.retryCount >= config.retry) {
      return Promise.reject(error);
    }

    config.retryCount += 1;

    const delayRetry = new Promise(resolve => {
      setTimeout(resolve, config.retryDelay(config.retryCount));
    });

    await delayRetry;

    console.log(`Retrying request (${config.retryCount}/${config.retry})`);
    return axiosInstance(config);
  }
);

export default axiosInstance;
