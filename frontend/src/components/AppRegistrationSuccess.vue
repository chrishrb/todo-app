<template>
    <AppLogo />
      <body class="bg-gray-100 flex h-full items-center py-16">
        <main class="w-full max-w-md mx-auto p-6">
          <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div class="p-4 sm:p-7">
              <div class="text-center">
                <h1 class="block text-2xl font-bold text-gray-800">Your Account has been created successfully !</h1>
              </div>
            </div>
            <div class="flex ml-2 mr-2 mb-2">
                <router-link to="/login" class="flex-grow py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm ">
                    <button type="button">Login</button>
                </router-link>
            </div>
          </div>
        </main>
      </body>
    </template>
    
    
    <script lang="ts">
    import { defineComponent } from 'vue';
    import AppLogo from "@/components/common/AppLogo.vue";
    
    export default defineComponent({
      name: "registration-success-component",
      components: {
        AppLogo,
      },
    });
    </script>
    
    