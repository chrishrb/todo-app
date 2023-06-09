import { defineStore } from 'pinia'
import baseApi from '@/common/base-api.service'
import router from "@/router";
import { FrontendError } from '@/exceptions/frontend.error';
import { mapStringToLocale } from '@/common/language.service';
import { useUserStore } from './user';
import i18n from '@/i18n';

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
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
    async logout() {
      const userStore = useUserStore();

      await baseApi.get("/auth/logout")
      localStorage.removeItem('jwt')
      this.jwt = null
      i18n.global.locale.value = mapStringToLocale(navigator.language);
      router.push('login');
      userStore.profile = undefined;
    },
    async refresh(){
      return baseApi.get("/auth/refresh").then((response) => {
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
