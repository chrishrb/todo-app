import { defineStore } from 'pinia'
import baseApi from '@/common/base-api.service';

export const useUserStore = defineStore({
  id: "user",
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
    async createUser(firstName: string, lastName: string, email: string, password: string) {
      try {
        const response = await baseApi.post("/users", { email, password, firstName, lastName })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    getProfile: (state) => state.profile,
    isProfileLoaded: (state) => !!state.profile,
  }
});
