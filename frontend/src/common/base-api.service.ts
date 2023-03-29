import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

// Token interceptors
axiosInstance.interceptors.request.use(
  (req) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      req.headers['Authorization'] = `Bearer ${authStore.token}`;
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
  // TODO: refresh token if expired
  async (err) => {
    return err;
  }
);

export default axiosInstance;
