import axios from "axios";
export const SERVER_BASE_URL = "http://localhost:3000/api/v1";
export const axiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});
