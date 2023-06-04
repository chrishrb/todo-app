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
                        <input type="firstName" id="firstName" name="firstName" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border" v-model="firstName">
                      </div>
                      <p v-if="firstNameEmpty" class="text-xs text-red-600" id="firstName-empty">This field cannot be empty</p>
                    </div>
                    <div>
                      <label for="lastName" class="block text-sm mb-2">Last Name</label>
                      <div class="relative">
                        <input type="lastName" id="lastName" name="lastName" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border" v-model="lastName">
                      </div>
                      <p v-if="lastNameEmpty" class="text-xs text-red-600" id="lastName-empty">This field cannot be empty</p>
                    </div>
                    <div>
                      <label for="email" class="block text-sm mb-2">Email</label>
                      <div class="relative">
                        <input type="email" id="email" name="email" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border" aria-describedby="email-error" v-model="email">
                      </div>
                      <p v-if="error" class="text-xs text-red-600" id="registration-error">{{ error }}</p>
                      <p v-if="emailEmpty" class="text-xs text-red-600" id="email-empty">This field cannot be empty</p>
                    </div>
                    <!-- End Form Group -->
    
                    <!-- Form Group -->
                    <div>
                      <div class="flex justify-between items-center">
                        <label for="password" class="block text-sm mb-2">Password</label>
                      </div>
                      <div class="relative">
                        <input v-if="showPassword" type="showPassword" id="password" name="password" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border " aria-describedby="password-error" v-model="password">
                        <input v-else type="Password" id="password" name="password" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border " aria-describedby="password-error" v-model="password">
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                          <button type="button" class="focus:outline-none" @click="toggleShow">
                            <component :is="showPassword ? 'EyeSlashIcon' : 'EyeIcon'" class="w-5 h-5" />
                          </button>
                        </div>
                        <p v-if="passwordEmpty" class="text-xs text-red-600" id="password-empty">This field cannot be empty</p>
                      </div>
                    </div>
                    <div>
                      <div class="flex justify-between items-center">
                        <label for="passwordConfirmation" class="block text-sm mb-2">Password confirmation</label>
                      </div>
                      <div class="relative">
                        <input v-if="showPassword" type="showPassword" id="passwordConfirmation" name="passwordConfirmation" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border " aria-describedby="password-error" v-model="confirmedPassword">
                        <input v-else type="Password" id="passwordConfirmation" name="passwordConfirmation" class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 border " aria-describedby="password-error" v-model="confirmedPassword">
                      </div>
                      <p v-if="passwordConfirmEmpty" class="text-xs text-red-600" id="passwordConfirmation-empty">This field cannot be empty</p>
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
      error: "",
      firstNameEmpty: false,
      lastNameEmpty:false,
      emailEmpty: false,
      passwordEmpty: false,
      passwordConfirmEmpty: false,
    }
  },
  components: {
    AppLogo,
    EyeIcon,
    EyeSlashIcon
  },
  methods: {
    register(){
      this.firstNameEmpty = this.firstName === "";
      this.lastNameEmpty = this.lastName === "";
      this.passwordsMatch = this.password === this.confirmedPassword;
      this.emailEmpty = this.email === "";
      this.passwordEmpty = this.password === "";
      this.passwordConfirmEmpty = this.confirmedPassword === "";

      if (!this.firstNameEmpty && !this.lastNameEmpty && this.passwordsMatch && !this.emailEmpty && !this.passwordEmpty && !this.passwordConfirmEmpty) {
        this.createUser();
      }
    },
    async createUser() {
      this.userStore.createUser(this.firstName, this.lastName, this.email, this.password).then(() => {
        this.error = "";
        router.push('/registerSuccess')
      }).catch((e) => {
        this.error = e;
      });
    },
    toggleShow() {
      this.showPassword = !this.showPassword;
    }
  }
});
</script>
    
    