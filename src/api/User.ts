import axios from "axios";
import { message } from "antd";
import { useAuthStore } from "../store/useAuthStore";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
});

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
      const { refreshToken } = useAuthStore.getState();

      fetch("https://dummyjson.com/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: refreshToken,
          expiresInMins: 30,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const { accessToken, refreshToken } = data;
          useAuthStore.getState().setRefreshToken(accessToken, refreshToken);
          console.log("Token refreshed successfully");
        })
        .catch(() => {
          const { clearToken } = useAuthStore.getState();
          clearToken();
          message.error("Session expired. Please log in again.");
          console.warn("Refresh token failed");
        });
    }

    return Promise.reject(error);
  }
);

export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/auth/login", {
    username,
    password,
    expiresInMins: 1,
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export default api;
