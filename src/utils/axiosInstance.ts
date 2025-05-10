import axios from "axios";
// export const SERVER_BASE_URL = "https://llm.jagan.shop"
const environment = "production";
export const SERVER_BASE_URL =
  environment === "production"
    ? "https://jagstream.yuvrajsoneja.in/api/v1"
    : "http://localhost:3005/api/v1";
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
