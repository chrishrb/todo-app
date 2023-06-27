<template>
  <div class="grid grid-rows-2 bg-white border shadow-sm rounded-xl p-4 m-2 hover:border-gray-400">

    <div class="col-span-2 flex h-10">
      <button id="addDetails"
        @click="showDetails"
      >
        <ChevronRightIcon
          class="w-5 h-5 transition"
          v-bind:style="{transform: `rotate(${deg}deg)`}"/>
      </button>

      <input type="title" id="title" name="title"
        placeholder="Titel"
        class="py-1 px-2 block w-full border-gray-300 rounded-md"
        ref="titleInput"
        v-on:keypress.enter="newTask"
        v-model="titleData"
      >
    </div>

    <div v-show="details">
      <textarea type="description" id="description" name="description"
        class="py-1 px-2 block w-full border-gray-300 rounded-md"
        placeholder="Beschreibung"
        ref="descriptionInput"
        v-model="descriptionData"
      />
      <VueDatePicker v-model="dueDate" text-input inline-with-input auto-apply />
    </div>

  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useTaskStore } from '@/stores/tasks'
import { ChevronRightIcon } from '@heroicons/vue/24/outline';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const store = useTaskStore();

const emit = defineEmits<{
  (event: 'closeNewTask'): void
}>()

// show switches
const details = ref(false);

const titleData = ref();
const titleInput = ref();
const deg = ref(0)
const dueDate = ref()
const descriptionData = ref();

onMounted(() => {
  titleInput.value.focus()
})

const newTask = () => {
  store.addTask(titleData.value, descriptionData.value, dueDate.value)
  titleData.value = undefined; 
  descriptionData.value = undefined;
  dueDate.value = undefined;
  emit('closeNewTask');
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
