<template>

  <div class="flex flex-row">
    <!-- add button -->
    <div>
      <button id="addTask"
        class="mt-2.5 block p-3 shadow-lg shadow-gray-300 rounded-full hover:shadow-2xl hover:shadow-gray-900 border border-gray-300 hover:-translate-y-0.5 hover:-translate-x-0.5"
        @click="showNewTask"
      >
        <PlusIcon class="w-7 h-7" />
      </button>
    </div>

    <!-- Task list -->
    <div class="flex flex-col flex-grow">
      <div v-show="task" class="flex flex-col items-start bg-white border shadow-sm rounded-xl p-4 m-2 hover:border-gray-400">

        <div class="flex items-start">
          <button id="addDetails"
            @click="showDetails"
          >
            <ChevronRightIcon
              class="w-5 h-5 transition"
              v-bind:style="{transform: `rotate(${deg}deg)`}"/>
          </button>

          <input type="title" id="title" name="title"
            placeholder="Titel"
            class="ml-3 py-1 px-2 block w-full border-none border-transparent focus:border-transparent focus:ring-0"
            ref="titleInput"
            v-on:keypress.enter="newTask"
            v-model="titleData"
          >
        </div>

        <div v-show="details" class="flex flex-grow justify-between pt-4">
          <VueDatePicker v-model="dueDate" text-input inline-with-input auto-apply />
          <input type="description" id="description" name="description"
            class="py-1 px-2 block w-full border-gray-300 rounded-md"
            placeholder="Beschreibung"
            ref="descriptionInput"
            v-model="descriptionData"
          >
        </div>

      </div>
      <div v-for="(item) in store.tasks" :key="item.id" >
        <div class="flex bg-white border shadow-sm rounded-xl p-4 m-2 items-center hover:border-gray-400">

          <button id="check3"
            class="flex-none w-5 h-5 rounded-full border border-primary-500 cursor-pointer hover:border-primary-800 flex"
            :class="[{ 'bg-primary-500': item.isChecked }]"
            @click="store.toggleChecked(item.id)"
          />

          <div class="pl-2">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { useTaskStore } from '@/stores/tasks';
import { nextTick, onMounted } from 'vue';
import { ChevronRightIcon, PlusIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const store = useTaskStore();

// Show switches
const task = ref(false);
const details = ref(false);

const titleData = ref();
const titleInput = ref();
const deg = ref(0)
const dueDate = ref()
const descriptionData = ref();

onMounted(() => {
  store.getMine()
})

const newTask = () => {
  store.addTask(titleData.value, descriptionData.value, dueDate.value)
  titleData.value = undefined; 
  descriptionData.value = undefined;
  dueDate.value = undefined;
  task.value = false;
}

const showDetails = () => {
  if (deg.value === 0) {
    deg.value = 90;
  } else {
    deg.value = 0;
  }

  details.value = !details.value;
}

async function showNewTask() {
  task.value = true;
  await nextTick()
  titleInput.value.focus();
}

</script>
