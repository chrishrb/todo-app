<template>
  <div class="flex flex-start bg-white border shadow-sm rounded-xl p-4 m-2 items-center hover:border-gray-400">

    <div class="flex">
      <button id="check3"
        class="flex-none w-5 h-5 rounded-full border border-primary-500 cursor-pointer hover:border-primary-800 flex"
        :class="[{ 'bg-primary-500': props.item.isChecked }]"
        @click="store.toggleChecked(props.item.id)"
      />

      <div class="pl-2">{{ item.title }}</div>
    </div>

    <div class="flex flex-grow justify-between pt-4">
      <VueDatePicker v-model="dueDate" text-input inline-with-input auto-apply />
      <input type="description" id="description" name="description"
        class="py-1 px-2 block w-full border-gray-300 rounded-md"
        placeholder="Beschreibung"
        ref="descriptionInput"
        v-model="descriptionData"
      >
    </div>

  </div>
</template>

<script lang="ts" setup>
import type { Task } from '@/schemas/task.schema'
import { useTaskStore } from '@/stores/tasks';
import { ref } from 'vue';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const store = useTaskStore()

const showDetails = ref();
const dueDate = ref()
const descriptionData = ref();

const props = defineProps<{
  item: Task
}>();

</script>
