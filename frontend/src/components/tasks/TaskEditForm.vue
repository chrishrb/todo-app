<template>


  <div class="flex flex-col bg-white border shadow-sm rounded-xl w-full h-[30rem]">
    <div class="flex justify-between items-center py-3 px-4">
      <div class="flex justify-between items-center flex-row">
        <input class="text-2xl text-primary-600 px-2 block w-full border border-gray-300 rounded-md h-full"
          v-model="taskDraft.title"
        />
      </div>
      <div class="inline-flex justify-between items-center">
        <button @click="props.closeEdit" class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm">
          <span class="sr-only">{{ $t('close') }}</span>
          <XMarkIcon/>
        </button>
      </div>
    </div>
    <!-- TODO conditional -->
    <div
      class="px-4 py-2 self-start"
      :class="[false ? 'text-red-500' : '']"
    >
      <div class="flex items-center">
        <CalendarIcon class="h-5 w-5 mr-1"/>
        <p class="font-bold"> {{ $t('due') }} </p>
      </div>
      <VueDatePicker
        class="mt-1"
        :locale="userStore.getLanguage"
        v-model="taskDraft.dueDate"
        inline-with-input
        :auto-apply="true"
        :min-date="new Date()"
      />
    </div>
    <div class="flex overflow-y-hidden pr-3 h-full">
      <div class="flex flex-col px-4 py-2 w-full">
        <div class="flex items-center">
          <ChatBubbleLeftRightIcon class="h-5 w-5 mr-1"/>
          <p class="font-bold"> {{ $t('description') }} </p>
        </div>
        <textarea class="mt-1 text-gray-800 my-2 py-1 px-2 w-full flex-auto overflow-y-auto border border-gray-300 rounded-md"
          v-model="taskDraft.description as string"
        />
      </div>
    </div>
    <div class="flex justify-end items-center py-2 px-4 border-t">
      <button
        @click="save()"
        type="button"
        class="mr-2 py-2 px-4 inline-flex justify-center items-center rounded-md border border-transparent font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
        :class="[isSaveDisabled ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600']"
        :disabled="isSaveDisabled"
      >
        Speichern
      </button>
      <button @click="cancel()" type="button" class="py-2 px-4 inline-flex justify-center items-center rounded-md border border-transparent font-semibold text-black bg-gray-300 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
        Abbrechen
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import { useUserStore } from '@/stores/user';
import {XMarkIcon } from "@heroicons/vue/24/outline";
import { ChatBubbleLeftRightIcon, CalendarIcon } from "@heroicons/vue/24/outline"
import type { Task } from '@/schemas/task.schema';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { hasAnyChanges } from '../utils/helpers';

const store = useTaskStore();
const userStore = useUserStore();

const isSaveDisabled = ref(true);

const props = defineProps<{
  task: Task,
  closeEdit: Function
}>();

const taskDraft = ref(JSON.parse(JSON.stringify(props.task)) as Task);

const emit = defineEmits<{
  (event: 'saveEdit', task: Task): void,
  (event: 'closeEdit'): void
}>();

watch(taskDraft.value, () => {
  isSaveDisabled.value = !hasAnyChanges(props.task, taskDraft.value)
});

function save() {
  console.log("DRAFT: ", taskDraft)
  store.updateTask(props.task.id, taskDraft.value);
  emit('saveEdit', taskDraft.value);
  props.closeEdit();
}

function cancel() {
  //TODO clear localstorage draft
  props.closeEdit();
}

</script>
