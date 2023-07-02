<template>
  <div
    class="flex bg-white border shadow-sm rounded-xl p-4 m-1.5 items-center hover:border-gray-400">
    <div>
      <button class="flex items-center justify-center w-6 h-6 cursor-pointer hover:border-primary-800"
        @click.stop="store.toggleChecked(props.item.id)">
        <div class="flex w-5 h-5 rounded-full border border-primary-500 " :class="[{ 'hidden': props.item.isChecked }]" />
        <CheckCircleIcon :class="[{ 'hidden': !props.item.isChecked }]" class="text-primary-600 w-full h-full" />
      </button>
    </div>

    <button class="grid grid-cols-1 grow pl-6 text-left" @click="openModal">
      <div class="justify-center">
        {{ item.title }}
        <span class="w-2.5 h-2.5 inline-block rounded-full mr-2" :class="store.colorOfTag(item.tag)"></span>
      </div>
      <span v-show="item.description"
        class="block whitespace-pre-line w-full border-gray-300 rounded-md text-gray-500 justify-center">
        {{ getShortenedDescription(item.description) }}
      </span>

    </button>
    <span class="justify-end min-w-fit pl-6" :class="[isTaskDue(item.dueDate) ? 'text-red-500' : '']">
      {{ getFancyDateString(item.dueDate, i18n.global.locale.value) }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from '@/schemas/task.schema'
import { useTaskStore } from '@/stores/tasks';
import { useRouter } from 'vue-router';
import { getFancyDateString } from '../utils/formatter';
import { CheckCircleIcon } from "@heroicons/vue/24/solid"
import i18n from '@/i18n';
import { isTaskDue } from '../utils/helpers';

const store = useTaskStore()
const router = useRouter()

const props = defineProps<{
  item: Task
}>();

function openModal() {
  const taskId = props.item.id;

  if (router.currentRoute.value.params.tag) {
    router.push({ name: 'tag-taskdetails', params: { taskId } });
  } else {
    router.push({ name: 'taskdetails', params: { taskId } });
  }
}

function getShortenedDescription(desc: string | null): string | null {
  if (!desc) {
    return null;
  }
  if (desc.length > 255) {
    return `${desc.slice(0, 255)}...`
  }

  return desc;
}

</script>
