import { defineStore } from 'pinia'
import unauthApi from '@/common/auth-api.service'
import router from "@/router";
import { FrontendError } from '@/exceptions/frontend.error';

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    jwt: localStorage.getItem('jwt') || null,

  }),
  actions: {
    async login(email: string, password: string) {
      return unauthApi.post("/auth/login", { email, password })
        .then((response) => {
          this.jwt = response.data.accessToken
          localStorage.setItem('jwt', response.data.accessToken)
        }).catch(e => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
    async logout() {
      await unauthApi.get("/auth/logout")
      localStorage.removeItem('jwt')
      this.jwt = null
      router.push('/login')
    },
    async refresh(){
      return unauthApi.get("/auth/refresh").then((response) => {
        this.jwt = response.data.accessToken
        localStorage.setItem('jwt', response.data.accessToken)
    })
    }
  },
  getters: {
    isLoggedIn(): boolean {
      return !!this.jwt
    }
  }
})
