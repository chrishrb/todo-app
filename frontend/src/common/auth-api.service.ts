import router from "@/router";
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
    if (err.response.status === 401) {
      try {
        await authStore.refresh();
      } catch (e) {
        await authStore.logout();
        return Promise.reject(e);
      }
      return axiosInstance.request(err.config);
    } else if (err.response.status === 500) {
      await router.push({name: 'error'});
    } else {
      return Promise.reject(err)
    }
  }
);

export default axiosInstance;
