import api from "./User";
import { useAuthStore } from "../store/useAuthStore";

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
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
      console.warn("Token expired or invalid");
    }
    return Promise.reject(error);
  }
);
