import axios from "axios";
import { getToken, clearToken } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000"
});

api.interceptors.request.use(config => {
  const t = getToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err?.response?.status === 401) {
      clearToken();                 // token expired/invalid
      window.location.href = "/signin";
    }
    return Promise.reject(err);
  }
);

export default api;
