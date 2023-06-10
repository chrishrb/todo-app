<template>
  <div data-hs-overlay="#task-detail-modal" class="grid grid-cols-12 cursor-pointer bg-white border shadow-sm rounded-xl p-4 m-2 items-center hover:border-gray-400">

    <TaskDetails
      :item="props.item"
      v-show="showTaskDetailModal"/>

    <div class="flex col-span-10 mt-1">
      <button
        class="w-5 h-5 rounded-full border border-primary-500 cursor-pointer hover:border-primary-800"
        :class="[{ 'bg-primary-500': props.item.isChecked }]"
        @click="store.toggleChecked(props.item.id)"
      />
      <div class="relative pl-2 -top-0.5">{{ item.title }}</div>
    </div>

    <span class="col-span-2">
      {{ getFancyDateString(item.dueDate, "de-DE") }}
    </span>

    <span 
      v-show="item.description"
      class="py-1 px-2 block w-full border-gray-300 rounded-md text-gray-500 col-span-7 left-5 relative"
    >
      {{ getShortenedDescription(item.description) }}
    </span>

  </div>
</template>

<script lang="ts" setup>
import type { Task } from '@/schemas/task.schema'
import { useTaskStore } from '@/stores/tasks';
import TaskDetails from '@/components/tasks/TaskDetails.vue'
import { ref } from 'vue';

const store = useTaskStore()

const showTaskDetailModal = ref(false);

const props = defineProps<{
  item: Task
}>();


function getShortenedDescription(desc: string | null): string | null{
  if (!desc) {
    return null;
  }
  if (desc.length > 255) {
    return `${desc.slice(0, 255)}...`
  }

  return desc;
}

function getFancyDateString(date: string | null | undefined, locale: string) {
  if (!date) {
    return ""
  }

  const d = new Date(date)
  return `${d.toLocaleDateString(locale, { weekday: 'long' })}, ${d.getDate()}.${d.getMonth()}. ${d.getFullYear()} - ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`
}

</script>
