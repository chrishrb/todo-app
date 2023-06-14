<template>
  <body class="bg-gray-100 flex h-full items-center py-16">
    <main class="w-full max-w-md mx-auto p-6">
      <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800">{{ $t('settings') }}</h1>
          </div>
          <div class="mt-5">
            <!-- Form -->
            <form @submit.prevent="changeSettings">
              <div class="grid gap-y-4">
                <!-- Form Group -->
                <div>
                  <label for="firstName" class="block text-sm mb-2">{{ $t('changeFirstName') }}</label>
                  <div class="relative">
                    <input type="firstName" id="firstName" name="firstName"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border"
                      v-model="firstName">
                  </div>
                </div>
                <div>
                  <label for="lastName" class="block text-sm mb-2">{{ $t('changeLastName') }}</label>
                  <div class="relative">
                    <input type="lastName" id="lastName" name="lastName"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border"
                      v-model="lastName">
                  </div>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div>
                  <div class="flex justify-between items-center">
                    <label for="password" class="block text-sm mb-2">{{ $t('changePassword') }}</label>
                  </div>
                  <div class="relative">
                    <input v-if="showPassword" type="showPassword" id="password" name="password"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border "
                      aria-describedby="password-error" v-model="password">
                    <input v-else type="Password" id="password" name="password"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border "
                      aria-describedby="password-error" v-model="password">
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button type="button" class="focus:outline-none" @click="toggleShow">
                        <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between items-center">
                    <label for="passwordConfirmation" class="block text-sm mb-2">{{ $t('passwordConfirmation') }}</label>
                  </div>
                  <div class="relative">
                    <input v-if="showPassword" type="showPassword" id="passwordConfirmation" name="passwordConfirmation"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border "
                      aria-describedby="password-error" v-model="confirmedPassword">
                    <input v-else type="Password" id="passwordConfirmation" name="passwordConfirmation"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border "
                      aria-describedby="password-error" v-model="confirmedPassword">
                  </div>
                </div>

                <div>
                  <label for="language" class="block text-sm mb-2">{{ $t('changeLanguage') }}</label>
                  <div class="relative">
                    <select v-model="language" id="language" name="language"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border">
                      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{
                        locale }}</option>
                    </select>
                  </div>
                </div>

                <p v-if="error" class="text-xs text-red-600" id="registration-error">{{ error }}</p>

                <!-- End Form Group -->
                <div class="flex">
                  <router-link to="/"
                    class="flex-grow py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-semibold bg-gray-100 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:bg-gray-100 focus:ring-offset-2 transition-all text-sm">
                    <button type="button">{{ $t('back') }}</button>
                  </router-link>
                  <button type="submit"
                    class="flex-grow ml-2 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm ">{{
                      $t('changeSettings') }}</button>
                </div>
              </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
      </div>
    </main>
  </body>
</template>
  
  
<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from "@/stores/user"
import router from '@/router';
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline"
import { getErrorText } from '@/exceptions/frontend.error';
import { mapLocaleToLanguage } from '@/common/language.service';
import { useI18n } from 'vue-i18n';

const userStore = useUserStore();
const {t} = useI18n()

const firstName = ref(userStore.profile?.firstName ?? "");
const lastName = ref(userStore.profile?.lastName ?? "");
const language = ref(userStore.getLanguage)
const password = ref("");
const confirmedPassword = ref("");
const showPassword = ref(false);
const passwordsMatch = ref(true);
const firstNameEmpty = ref(false);
const lastNameEmpty = ref(false);
const passwordEmpty = ref(false);
const error = ref("");
const passwordConfirmEmpty = ref(false);
const toggleShow = () => {
  showPassword.value = !showPassword.value;
};

const changeSettings = async () => {
  firstNameEmpty.value = firstName.value === "";
  lastNameEmpty.value = lastName.value === "";
  passwordsMatch.value = password.value === confirmedPassword.value;
  passwordEmpty.value = password.value === "";
  passwordConfirmEmpty.value = confirmedPassword.value === "";

  if (!passwordsMatch.value) {
    error.value = t("passwordsDontMatch")
    return;
  }
  await updateUser();
};

const updateUser = async () => {
  try {
    await userStore.updateUser(
      (userStore.profile?.id ?? ''),
      firstName.value,
      lastName.value,
      password.value,
      mapLocaleToLanguage(language.value),
    );
    error.value = "";
    router.push({name: 'settingsSuccess'});
  } catch (e: any) {
    console.log(e)
    error.value = getErrorText(e.details);
  }
};

</script>
