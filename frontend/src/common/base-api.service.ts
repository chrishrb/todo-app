import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  }
});

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
    if (err.response.status === 500) {
      await router.push({name: 'error'});
    } else {
      return Promise.reject(err)
    }
  }
);

export default axiosInstance;
