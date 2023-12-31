import { defineStore } from 'pinia'
import authApi from '@/common/auth-api.service';
import baseApi from '@/common/base-api.service'
import { FrontendError } from '@/exceptions/frontend.error';
import { mapLanguageToLocale } from '@/common/language.service';
import type { Language, User } from '@/schemas/user.schema';
import i18n from '@/i18n';

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    profile: undefined as User | undefined,
  }),
  actions: {
    async getMe() {
      return authApi.get("/me")
        .then((response) => {
          this.profile = response.data
          i18n.global.locale.value = this.getLanguage
        })
        .catch(() => {});
    },
    async createUser(firstName: string, lastName: string, email: string, password: string, language: Language) {
      return baseApi.post("/users", { email, password, firstName, lastName, language })
        .catch(e => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
    async updateUser(userId: string, firstName: string, lastName: string, password: string, language: Language) {
      return authApi.put(`/users/${userId}`, { password, firstName, lastName, language })
        .then((response) => {
          this.profile = response.data
          i18n.global.locale.value = mapLanguageToLocale(this.profile?.language)
        })
        .catch(e => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    }
  },
  getters: {
    isProfileLoaded: (state) => !!state.profile,
    getLanguage: (state) => mapLanguageToLocale(state.profile?.language),
  }
});
