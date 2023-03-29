import { defineStore } from 'pinia'
import baseApi from '@/common/base-api.service';

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null,
  }),
  actions: {
    async getMe(email: string, password: string) {
      console.log(email, password)
      baseApi.get("/users/me")
        .then((response) => {
          this.profile = response.data;
        })
        .catch((error) => {
          console.log(error);
          throw Error("User profile error");
        })
    },
  },
  getters: {
    getProfile: (state) => state.profile,
    isProfileLoaded: (state) => !!state.profile,
  }
});
