<template>
    <AppLogo />
      <body class="bg-gray-100 flex h-full items-center py-16">
        <main class="w-full max-w-md mx-auto p-6">
          <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div class="p-4 sm:p-7">
              <div class="text-center">
                <h1 class="block text-2xl font-bold text-gray-800">Register</h1>
              </div>
    
              <div class="mt-5">
    
                <!-- Form -->
                <form @submit.prevent="register">
                  <div class="grid gap-y-4">
                    <!-- Form Group -->
                    <div>
                      <label for="firstName" class="block text-sm mb-2">First Name</label>
                      <div class="relative">
                        <input type="firstName" id="firstName" name="firstName" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border" required v-model="firstName">
                        <div class="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                          <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label for="lastName" class="block text-sm mb-2">Last Name</label>
                      <div class="relative">
                        <input type="lastName" id="lastName" name="lastName" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border" required v-model="lastName">
                        <div class="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                          <svg class="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
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
                      <p class="hidden text-xs text-red-600 mt-2" id="email-error">This Email Adress has already been taken</p>
                    </div>
                    <!-- End Form Group -->
    
                    <!-- Form Group -->
                    <div>
                      <div class="flex justify-between items-center">
                        <label for="password" class="block text-sm mb-2">Password</label>
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
                      <p class="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                    </div>
                    <div>
                      <div class="flex justify-between items-center">
                        <label for="passwordConfirmation" class="block text-sm mb-2">Password confirmation</label>
                      </div>
                      <div class="relative">
                        <input v-if="showPassword" type="showPassword" id="passwordConfirmation" name="passwordConfirmation" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border " required aria-describedby="password-error" v-model="confirmedPassword">
                        <input v-else type="Password" id="passwordConfirmation" name="passwordConfirmation" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border " required aria-describedby="password-error" v-model="confirmedPassword">
                      </div>
                      <p v-show="!(passwordsMatch)" class="text-xs text-red-600 mt-2" id="password-error">Passwords don't match</p>
                    </div>
                    <!-- End Form Group -->
                      <div class="flex">
                        <router-link to="/login" class="flex-grow py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-semibold bg-gray-100 text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:bg-gray-100 focus:ring-offset-2 transition-all text-sm">
                          <button type="button">Back to login</button>
                        </router-link>
                          <button type="submit" class="flex-grow ml-2 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm ">Register</button>
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
    import { defineComponent } from 'vue';
    import { useUserStore } from "@/stores/user"
    import router from '@/router';
    import AppLogo from "@/components/common/AppLogo.vue";
    import {EyeIcon, EyeSlashIcon} from "@heroicons/vue/24/outline"
    
    export default defineComponent({
      name: "registration-component",
      setup() {
        const userStore = useUserStore();
        return { userStore };
      },
      data() {
        return {
          firstName: "",
          lastName: "",  
          email: "",
          password: "",
          confirmedPassword: "",
          showPassword: false,
          passwordsMatch: true,
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
        register(){
          this.password === this.confirmedPassword ? this.createUser() : this.passwordsMatch = false
        },
        async createUser() {
          await this.userStore.createUser(this.firstName, this.lastName, this.email, this.password);
          router.push('/registerSuccess')
        },
        toggleShow() {
          this.showPassword = !this.showPassword;
        }
      }
    });
    </script>
    
    