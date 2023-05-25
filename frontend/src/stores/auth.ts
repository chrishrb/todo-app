import { defineStore } from 'pinia'
import baseApi from '@/common/base-api.service';


export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    jwt: localStorage.getItem('jwt') || null,  
  }),
  actions: {
    async login(email: string, password: string) {
        const response = await baseApi.post("/auth/login", { email, password })
        if (response.status === 200){
          this.jwt = response.data
          localStorage.setItem('jwt', JSON.stringify(response.data))
          return true
        } else {
          throw new Error(JSON.parse(response.request.response).details)
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
