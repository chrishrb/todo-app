import { defineStore } from 'pinia'
import baseApi from '@/common/base-api.service';

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    jwt: localStorage.getItem('jwt') || null,
  }),
  actions: {
    async login(email: string, password: string) {
      return baseApi.post("/auth/login", { email, password })
        .then((response) => {
          this.jwt = response.data
          localStorage.setItem('jwt', JSON.stringify(response.data))
        }).catch(e => {
          throw new Error(e.response.data.details)
        })
    },
    logout() {
      localStorage.removeItem('jwt')
      this.jwt = null
    }
  },
  getters: {
    isLoggedIn(): boolean {
      return !!this.jwt
    }
  }
})
