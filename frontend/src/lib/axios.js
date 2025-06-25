import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:import.meta.env.MODE ==="development"? "https://fullstack-chat-app-6-mw51.onrender.com":"/api",
  withCredentials: true,
});