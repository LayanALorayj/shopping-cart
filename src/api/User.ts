import axios from "axios";
import { message } from "antd";
import { useAuthStore } from "../store/useAuthStore";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { clearToken } = useAuthStore.getState();
      clearToken();
      message.error("Please log in again.");
      console.warn("Token expired — cleared from store");
    }
    return Promise.reject(error);
  }
);


export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/auth/login", {
    username,
    password,
    expiresInMins: 2,
  });
  return response.data; 
};

export const getProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export default api;
