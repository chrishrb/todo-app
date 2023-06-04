import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  }
});

// Token interceptors
axiosInstance.interceptors.request.use(
  (req) => {
    const authStore = useAuthStore();
    if (authStore.jwt) {
      req.headers['Authorization'] = `Bearer ${authStore.jwt}`;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const authStore = useAuthStore();
    if (err.response.status === 401 && !err.config._retry) {
      err.config._retry = true;
      try {
        await authStore.refresh();
        err.config.headers.Authorization = `Bearer ${authStore.jwt}`;
        return axiosInstance(err.config);
      } catch (refreshError) {
        authStore.logout();
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(err);
    }
  }
);


export default axiosInstance;
