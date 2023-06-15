<template>
  <div 
    class="grid grid-cols-12 bg-white border shadow-sm rounded-xl p-4 m-2 items-center hover:border-gray-400"
    @click="openModal"
  >

    <TaskDetails />

    <div class="flex col-span-10 mt-1">
      <button
        class="flex items-center justify-center w-6 h-6 cursor-pointer hover:border-primary-800"
        @click.stop="store.toggleChecked(props.item.id)">
        <div class="flex w-5 h-5 rounded-full border border-primary-500 "
          :class="[{ 'hidden': props.item.isChecked }]"
        />
        <CheckCircleIcon :class="[{ 'hidden': !props.item.isChecked }]" class="text-primary-600 w-full h-full"/>
      </button>

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
import { useRouter } from 'vue-router';
import { CheckCircleIcon } from "@heroicons/vue/24/solid"

const store = useTaskStore()
const router = useRouter()

const props = defineProps<{
  item: Task
}>();

function openModal() {
  const taskId = props.item.id;
  router.push({ name: 'taskdetails', params: { taskId } });
}

function getShortenedDescription(desc: string | null): string | null{
  if (!desc) {
    return null;
  }
  if (desc.length > 255) {
    return `${desc.slice(0, 255)}...`
  }

  return desc;
}

function getFancyDateString(date: string | undefined, locale: string) {
  if (!date) {
    return ""
  }

  const d = new Date(date)
  return `${d.toLocaleDateString(locale, { weekday: 'long' })}, ${d.getDate()}.${d.getMonth()}. ${d.getFullYear()} - ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`
}

</script>
