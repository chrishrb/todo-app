<template>
  <div class="flex flex-col bg-white border shadow-sm rounded-xl w-full h-[30rem]">
    <div class="flex items-center py-3 px-4">
      <div class="flex flex-grow items-center flex-row mr-3">
        <input class="text-2xl text-primary-600 px-2 block w-full border border-gray-300 rounded-md h-full"
          v-model="taskDraft.title"
        />
      </div>
      <div class="flex items-center">
        <button @click="emit('closeModal')" class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm">
          <span class="sr-only">{{ $t('close') }}</span>
          <XMarkIcon/>
        </button>
      </div>
    </div>

    <div class="px-4 py-2 self-start z-10">
      <div class="flex items-center">
        <TagIcon class="h-5 w-5 mr-1"/>
        <p class="font-bold"> {{ $t('tag') }} </p>
      </div>
      <Combobox v-model="taskDraft.tag" nullable class="mt-1">
        <div class="relative">
          <div class="relative overflow-hidden w-full cursor-default bg-white text-left sm:text-sm">
            <ComboboxInput class="w-full px-2 focus:outline-4 rounded-md py-2 pr-10 border border-gray-300 text-sm leading-5 text-gray-900 h-10"
              :placeholder="$t('task.tagPlaceholder')" @change="query = $event.target.value" />
            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </ComboboxButton>
          </div>
          <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0"
            @after-leave="query = ''">
            <ComboboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
              <div v-if="taskStore.tags?.length === 0 && query !== ''"
                class="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
              <ComboboxOption v-if="queryTag" :value="queryTag" v-slot="{active}">
                <li class="relative cursor-default select-none py-2 pl-10 pr-4" :class="{
                  'bg-primary-500 text-white': active,
                  'text-gray-900': !active,
                }">
                  Create "{{ query }}"
                </li>
              </ComboboxOption>

              <ComboboxOption v-for="option in filteredOptions" as="template" :key="option" :value="option"
                v-slot="{ selected, active }">
                <li class="relative cursor-default select-none py-2 pl-10 pr-4" :class="{
                  'bg-primary-500 text-white': active,
                  'text-gray-900': !active,
                }">
                  <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                    {{ option }}
                  </span>
                  <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3"
                    :class="{ 'text-white': active, 'text-primary-500': !active }">
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </TransitionRoot>
        </div>
        </Combobox>
      </div>
    <div
      class="px-4 py-2 self-start"
      :class="[isTaskDue(taskDraft.dueDate) ? 'text-red-500' : '']"
    >
      <div class="flex items-center">
        <CalendarIcon class="h-5 w-5 mr-1"/>
        <p class="font-bold"> {{ $t('due') }} </p>
      </div>
      <VueDatePicker
        class="mt-1"
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
          v-model="taskDraft.description"
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
        {{ $t('save') }}
      </button>
      <button @click="cancel()" type="button" class="py-2 px-4 inline-flex justify-center items-center rounded-md border border-transparent font-semibold text-black bg-gray-300 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
        {{ $t('cancel') }}
      </button>
    </div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import { XMarkIcon, ChatBubbleLeftRightIcon, CalendarIcon, TagIcon } from "@heroicons/vue/24/outline"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/24/outline"
import type { Task } from '@/schemas/task.schema';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { hasAnyChanges, isTaskDue } from '../utils/helpers';
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  TransitionRoot
} from '@headlessui/vue'
import store from 'storejs';
import { computed } from 'vue';

const taskStore = useTaskStore();

const isSaveDisabled = ref(true);

const props = defineProps<{
  task: Task,
}>();

const taskDraft = ref(JSON.parse(JSON.stringify(props.task)) as Task);

const emit = defineEmits<{
  (event: 'saveEdit'): void,
  (event: 'closeModal'): void,
  (event: 'closeEdit'): void
}>();

onMounted(() => {
  isSaveDisabled.value = !store.has(`__draft_${props.task.id}`)
  if (store.has(`__draft_${props.task.id}`)) {
    taskDraft.value = store.get(`__draft_${props.task.id}`);
  }
})

watch(taskDraft.value, () => {
  isSaveDisabled.value = !hasAnyChanges(props.task, taskDraft.value)
  store.set(`__draft_${props.task.id}`, taskDraft.value)
});

function save() {
  taskStore.updateTask(props.task.id, taskDraft.value).then(() => {
    store.remove(`__draft_${props.task.id}`);
    emit('saveEdit');
  })
}

function cancel() {
  store.remove(`__draft_${props.task.id}`);
  emit('closeEdit');
}

const query = ref('')

const queryTag = computed(() => {
  return (query.value === '' || taskStore.tags?.includes(query.value)) ? null : query.value
})

const filteredOptions = computed(() =>
  query.value === ''
    ? taskStore.tags
    : taskStore.tags?.filter((option) => {
      return option.toLowerCase().includes(query.value.toLowerCase())
    })
)

</script>
