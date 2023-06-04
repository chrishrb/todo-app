<template>

  <!-- Task list -->
  <div v-for="(item, key) in store.tasks">
    <div class="flex bg-white border shadow-sm rounded-xl p-4 m-2 items-center hover:border-gray-400">

      <button id="check3"
        class="flex-none w-5 h-5 rounded-full border border-primary-500 cursor-pointer hover:border-primary-800 flex"
        :class="[{ 'bg-primary-500': item.isChecked }]"
        @click="store.toggleChecked(item.id)"
      />

      <div class="pl-2">{{ item.title }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTaskStore } from '@/stores/tasks';
import { onMounted } from 'vue';

const store = useTaskStore();

onMounted(() => {
  store.getMine()
})
</script>
