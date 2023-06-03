import { defineStore } from 'pinia'
import baseApi from '@/common/base-api.service';
import router from "@/router";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    jwt: localStorage.getItem('jwt') || null,
  }),
  actions: {
    async login(email: string, password: string) {
      return baseApi.post("/auth/login", { email, password })
        .then((response) => {
          this.jwt = response.data.accessToken
          localStorage.setItem('jwt', response.data.accessToken)
        }).catch(e => {
          throw new Error(e.response.data.details)
        })
    },
    async logout() {
      await baseApi.get("/auth/logout")
      localStorage.removeItem('jwt')
      this.jwt = null
      router.push('/login')
    },
    async refresh(){
      return baseApi.get("/auth/refresh")
    }
  },
  getters: {
    isLoggedIn(): boolean {
      return !!this.jwt
    }
  }
})
