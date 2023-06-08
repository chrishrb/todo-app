<template>
  <div class="absolute bottom-5 right-5">
    <div class="locale-changer flex items-center rounded-md bg-white px-3 py-2">
      <GlobeAltIcon class="w-6 h-6" />
      <select v-model="$i18n.locale" class="pr-1 block w-full border-gray-200 text-sm ">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}
        </option>
      </select>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { GlobeAltIcon } from "@heroicons/vue/24/outline"
</script>
