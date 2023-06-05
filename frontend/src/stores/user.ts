import { defineStore } from 'pinia'
import baseApi from '@/common/base-api.service';
import type { User } from '@/schemas/user.schema';

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    profile: undefined as User | undefined
  }),
  actions: {
    async getMe() {
      return baseApi.get("/me")
        .then((response) => {
          this.profile = response.data
        })
        .catch((error) => {
          console.log(error);
          throw Error("User profile error");
        })
    },
    async createUser(firstName: string, lastName: string, email: string, password: string) {
      return baseApi.post("/users", { email, password, firstName, lastName })
      .catch(e => {
        throw new Error(e.response.data.details)
      })
    }
  },
  getters: {
    getProfile: (state) => state.profile,
    isProfileLoaded: (state) => !!state.profile,
  }
});
