<template>
  <body class="bg-gray-100 flex h-full items-center py-16">
    <main class="w-full max-w-md mx-auto p-6">
      <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800">{{ $t('signIn') }}</h1>
          </div>
          <div class="mt-5">

            <!-- Form -->
            <form @submit.prevent="login">
              <div class="grid gap-y-4">
                <!-- Form Group -->
                <div>
                  <label for="email" class="block text-sm mb-2">{{ $t('email') }}</label>
                  <div class="relative">
                    <input type="email" id="email" name="email" :placeholder="$t('email')"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border"
                      required aria-describedby="email-error" v-model="email">
                  </div>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div>
                  <div class="flex justify-between items-center">
                    <label for="password" class="block text-sm mb-2">{{ $t('password') }}</label>
                  </div>
                  <div class="relative">
                    <input v-if="showPassword" type="showPassword" id="password" name="password"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border "
                      required aria-describedby="password-error" v-model="password">
                    <input v-else type="Password" id="password" name="password" :placeholder="$t('password')"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border "
                      required aria-describedby="password-error" v-model="password">
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button type="button" class="focus:outline-none" @click="toggleShow">
                        <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <p v-if="error" class="text-xs text-red-500" id="login-error">{{ error }}</p>
                <div class="flex">
                  <router-link to="/register"
                    class="flex-grow py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-semibold bg-gray-100 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:bg-gray-100 focus:ring-offset-2 transition-all text-sm">
                    <button type="button">{{ $t('register') }}</button>
                  </router-link>
                  <button type="submit"
                    class="flex-grow ml-2 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm ">{{
                      $t('login') }}</button>
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
import { useAuthStore } from "@/stores/auth"
import { useRouter } from 'vue-router';
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline"
import { getErrorText } from '@/exceptions/frontend.error';

const authStore = useAuthStore();
const email = ref();
const password = ref();
const showPassword = ref(false);
const error = ref("");
const router = useRouter();

const login = async () => {
  try {
    await authStore.login(email.value, password.value);
    error.value = "";
    router.push({ name: 'home' });
  } catch (e: any) {
    error.value = getErrorText(e.details);
  }
};

const toggleShow = () => {
  showPassword.value = !showPassword.value;
};

</script>

