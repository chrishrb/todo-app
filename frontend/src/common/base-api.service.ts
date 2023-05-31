import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { getTokenString } from "./helpers/jwt";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  (req) => {
    const authStore = useAuthStore()

    if (authStore.jwt) {
      req.headers.setAuthorization(authStore.jwt)
    }
    return req;
  }
)

export default axiosInstance;
