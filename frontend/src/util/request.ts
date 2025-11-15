// src/util/request.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import config from "./config";
import { getToken, removeToken, isTokenExpired } from "./auth";

// Create Axios instance
const api = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: add Authorization header
api.interceptors.request.use(
  (requestConfig: AxiosRequestConfig) => {
    // Ensure headers exist
    requestConfig.headers = requestConfig.headers ?? {};

    const token = getToken();
    if (token) {
      if (!isTokenExpired(token)) {
        // Cast headers as any to safely assign Authorization
        (requestConfig.headers as any)["Authorization"] = `Bearer ${token}`;
      } else {
        removeToken();
        console.warn("Token expired. Please login again.");
      }
    }

    return requestConfig;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeToken();
      console.warn("Unauthorized. Please login again.");
      // Optionally redirect to login page here
    }
    return Promise.reject(error);
  }
);

export default api;
