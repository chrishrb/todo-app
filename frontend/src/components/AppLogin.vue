<template>
  <AppLogo />

  <body class="bg-gray-100 flex h-full items-center py-16">
    <main class="w-full max-w-md mx-auto p-6">
      <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800">Sign in</h1>
          </div>
          <div class="mt-5">

            <!-- Form -->
            <form @submit.prevent="login">
              <div class="grid gap-y-4">
                <!-- Form Group -->
                <div>
                  <label for="email" class="block text-sm mb-2">Email</label>
                  <div class="relative">
                    <input type="email" id="email" name="email"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border"
                      required aria-describedby="email-error" v-model="email">
                  </div>
                </div>
                <!-- End Form Group -->

                <!-- Form Group -->
                <div>
                  <div class="flex justify-between items-center">
                    <label for="password" class="block text-sm mb-2">Password</label>
                    <a class="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                      href="../examples/html/recover-account.html">Forgot password?</a>
                  </div>
                  <div class="relative">
                    <input v-if="showPassword" type="showPassword" id="password" name="password"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border "
                      required aria-describedby="password-error" v-model="password">
                    <input v-else type="Password" id="password" name="password"
                      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border "
                      required aria-describedby="password-error" v-model="password">
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button type="button" class="focus:outline-none" @click="toggleShow">
                        <component :is="showPassword ? 'EyeSlashIcon' : 'EyeIcon'" class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <p v-if="error" class="text-xs text-red-600" id="login-error">{{ error }}</p>
                <div class="flex">
                  <router-link to="/register"
                    class="flex-grow py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-semibold bg-gray-100 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:bg-gray-100 focus:ring-offset-2 transition-all text-sm">
                    <button type="button">Register</button>
                  </router-link>
                  <button type="submit"
                    class="flex-grow ml-2 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm ">Login</button>
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


<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from "@/stores/auth"
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import AppLogo from "@/components/common/AppLogo.vue";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline"

export default defineComponent({
  name: "login-component",
  components: {
    AppLogo,
    EyeIcon,
    EyeSlashIcon
  },
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const email = ref("root@example.com");
    const password = ref("root");
    const showPassword = ref(false);
    const error = ref("");
    const router = useRouter();

    const login = async () => {
      try {
        await authStore.login(email.value, password.value);
        error.value = "";
        router.push('/home');
      } catch (e: any) {
        error.value = e;
      }
    };

    const toggleShow = () => {
      showPassword.value = !showPassword.value;
    };

    return { email, password, showPassword, error, login, toggleShow };
  },
});
</script>

