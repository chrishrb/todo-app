<template>
  <LogoComponent />

  <div class="bg-gray-100 flex h-full items-center py-16">
    <main class="w-full max-w-xl mx-auto p-6">
      <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="grid p-4 sm:p-7 place-items-center">
          <ExclamationTriangleIcon class="w-9 h-9 text-red-500 items-center"/>
          <h1 class="text-xl pb-6 text-red-500 font-bold">
            {{ $t('errorPage.header') }}
          </h1>
          <p class="text-sm text-gray-800">
            {{ $t('errorPage.subHeader') }}
          </p>
          <button 
            class="flex-grow mt-8 ml-2 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
            @click="$router.push({name: 'home'})">
            {{ $t('errorPage.button') }}
          </button>
        </div>
      </div>
    </main>
  </div>

    <LanguageSelect />
</template>
<script lang="ts" setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline"
import LogoComponent from "@/components/common/LogoComponent.vue";
import LanguageSelect from '@/components/common/LanguageSelect.vue'
</script>
