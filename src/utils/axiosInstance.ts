import axios from "axios";
export const SERVER_BASE_URL = "http://localhost:3000/api/v1";
export const axiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // If sending FormData, let the browser set the Content-Type
    // This ensures the boundary string is set correctly
    delete config.headers["Content-Type"];
  }
  return config;
});
