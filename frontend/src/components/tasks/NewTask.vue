<template>
  <div class="bg-white border shadow-sm rounded-xl p-4 m-2 hover:border-gray-400">

    <div class="col-span-2 flex h-10">
      <button id="addDetails" @click="showDetails">
        <ChevronRightIcon class="w-5 h-5 mr-2 transition" v-bind:style="{ transform: `rotate(${deg}deg)` }" />
      </button>

      <input type="title" id="title" name="title" :placeholder="$t('task.titlePlaceholder')"
        class="px-2 block w-full border border-gray-300 rounded-md text-sm text-gray-900" ref="titleInput"
        v-on:keypress.enter="newTask" v-model="titleData">
    </div>

    <div v-show="details" class="pl-7">
      <textarea type="description" id="description" name="description"
        class="my-2 py-1 px-2 block w-full border border-gray-300 rounded-md text-sm text-gray-900"
        :placeholder="$t('task.descriptionPlaceholder')" ref="descriptionInput" v-model="descriptionData" />
      <VueDatePicker v-model="dueDate" input-class-name="text-sm placeholder-gray-500 h-10 rounded-md px-2" class
        :placeholder="$t('task.datePlaceholder')" :min-date="new Date()" :auto-apply="true" :teleport="true"
        :hide-input-icon="true" :clearable="true" :start-time="DEFAULT_TIME">
      </VueDatePicker>
      <div class="py-2">
        <Combobox v-model="tagData" nullable :disabled="route.params.tag != null">
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
                <div v-if="store.tags?.length === 0 && query !== ''"
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
      <button @click="newTask" type="button"
        class="py-2 px-4 inline-flex justify-center items-center rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
        {{ $t('task.createTask') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useTaskStore } from '@/stores/tasks'
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
  TransitionRoot
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/24/outline"
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const store = useTaskStore();

const emit = defineEmits<{
  (event: 'closeNewTask'): void
}>()

// show switches
const details = ref(false);

const DEFAULT_TIME = ref({ hours: 0, minutes: 0});

const titleData = ref();
const titleInput = ref();
const deg = ref(0)
const dueDate = ref()
const descriptionData = ref();
const tagData = ref();
const query = ref('')

const queryTag = computed(() => {
  return (query.value === '' || store.tags?.includes(query.value)) ? null : query.value
})

const filteredOptions = computed(() =>
  query.value === ''
    ? store.tags
    : store.tags?.filter((option) => {
      return option.toLowerCase().includes(query.value.toLowerCase())
    })
)

onMounted(() => {
  titleInput.value.focus()
  store.getTags()
  tagData.value = route.params.tag as string;
})

watch(route, () => {
  tagData.value = route.params.tag as string;
});

const newTask = () => {
  store.addTask(titleData.value, descriptionData.value, dueDate.value, tagData.value).then(() => {
    titleData.value = undefined;
    descriptionData.value = undefined;
    dueDate.value = undefined;
    query.value = '';
    tagData.value = null;
    emit('closeNewTask');
  })
}

const showDetails = () => {
  if (deg.value === 0) {
    deg.value = 90;
  } else {
    deg.value = 0;
  }

  details.value = !details.value;
}
</script>
