import { defineStore } from 'pinia'
import baseApi from '@/common/base-api.service';
import { deleteToken, getToken, saveToken } from '@/common/jwt.service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: getToken(),
  }),
  actions: {
    async login(email: string, password: string): Promise<void> {
      return baseApi.post("/auth/login", { "email": email, "password": password })
        .then((response) => {
          saveToken(response.data.access_token);
          this.token = getToken()
        })
        .catch((error) => {
          deleteToken();
          console.log(error);
          throw Error("Auth error");
        })
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  }
});
