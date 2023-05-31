import { useAuthStore } from "@/stores/auth";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(
  (req) => {
    
    const st = localStorage.getItem("jwt")
    const js = JSON.parse(st || '{}');

    const {tokenType, accessToken} = js

    console.log(req.headers)
    req.headers.setAuthorization(`${tokenType} ${accessToken}`)
    console.log(req.headers)

    return req;
  }
)

export default axiosInstance;
