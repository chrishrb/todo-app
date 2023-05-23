<template>
<AppLogo />
  <body class="bg-gray-100 flex h-full items-center py-16">
    <main class="w-full max-w-md mx-auto p-6">
      <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800">Sign in</h1>
            <p class="mt-2 text-sm text-gray-600">
              Don't have an account yet?
              <a class="text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/signup.html">
                Sign up here
              </a>
            </p>
          </div>

          <div class="mt-5">

            <!-- Form -->
            <form @submit.prevent="login">
              <div class="grid gap-y-4">
                <!-- Form Group -->
                <div>
                  <label for="email" class="block text-sm mb-2">Email</label>
                  <div class="relative">
                    <input type="email" id="email" name="email" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border" required aria-describedby="email-error" v-model="email">
                    <div class="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                      <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div>
                  <div class="flex justify-between items-center">
                    <label for="password" class="block text-sm mb-2">Password</label>
                    <a class="text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/recover-account.html">Forgot password?</a>
                  </div>
                  <div class="relative">
                    <input v-if="showPassword" type="showPassword" id="password" name="password" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border " required aria-describedby="password-error" v-model="password">
                    <input v-else type="Password" id="password" name="password" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border " required aria-describedby="password-error" v-model="password">
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button type="button" class="focus:outline-none" @click="toggleShow">
                        <component :is="showPassword ? 'EyeSlashIcon' : 'EyeIcon'" class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <!-- End Form Group -->
                <button type="submit" class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm ">Login</button>
              </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
      </div>
    </main>
  </body>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from "@/stores/auth"
import router from '@/router';
import AppLogo from "@/components/common/AppLogo.vue";
import {EyeIcon, EyeSlashIcon} from "@heroicons/vue/24/outline"

export default defineComponent({
  name: "login-component",
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      // TODO: remove
      email: "root@example.com",
      password: "root",
      showPassword: false,
    }
  },
  computed: {
    buttonLabel() {
      return (this.showPassword) ? "Hide" : "Show";
    }
  },
  components: {
    AppLogo,
    EyeIcon,
    EyeSlashIcon
  },
  methods: {
    async login() {
      await this.authStore.login(this.email, this.password);
      router.push('/home')
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    }
  }
});
</script>

