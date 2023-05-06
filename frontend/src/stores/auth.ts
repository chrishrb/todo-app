import { defineStore } from 'pinia'
import baseApi from '@/common/base-api.service';


export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    jwt: localStorage.getItem('jwt') || null,  
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await baseApi.post("/auth/login", { email, password })
        this.jwt = response.data
        localStorage.setItem('jwt', response.data)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    logout(){
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
