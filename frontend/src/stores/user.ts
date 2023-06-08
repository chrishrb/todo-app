import { defineStore } from 'pinia'
import baseApi from '@/common/base-api.service';
import unauthApi from '@/common/auth-api.service'
import type { User } from '@/schemas/user.schema';
import { FrontendError } from '@/exceptions/frontend.error';

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
      return unauthApi.post("/users", { email, password, firstName, lastName })
        .catch(e => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
    async updateUser(userId: string, firstName: string, lastName: string, email: string, password: string) {
      return baseApi.put(`/users/${userId}`, {email, password, firstName, lastName})
      .catch(e => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
      })
    }
  },
  getters: {
    getProfile: (state) => state.profile,
    isProfileLoaded: (state) => !!state.profile,
  }
});
