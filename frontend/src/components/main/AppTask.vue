<template>

  <div class="flex flex-row">
    <!-- add button -->
    <div>
      <button id="addTask"
        class="mt-3 block p-3 shadow-2xl shadow-gray-900 rounded-full hover:border hover:border-gray-300 hover:-translate-y-1 hover:-translate-x-1"
        @click="showNewTask"
      >
        <PlusIcon class="w-8 h-8" />
      </button>
    </div>

    <!-- Task list -->
    <div class="flex flex-col flex-grow">
      <div v-show="task" class="flex bg-white border shadow-sm rounded-xl p-4 m-2 items-center hover:border-gray-400">

        <!-- <button id="newTask" -->
        <!--   class="flex-none w-5 h-5 rounded-full border border-primary-500 cursor-pointer hover:border-primary-800 flex" -->
        <!-- /> -->

        <input type="title" id="title" name="title"
          ref="titleInput"
          class="ml-3 py-1 px-2 block w-full border-none border-transparent focus:border-transparent focus:ring-0"
          v-on:keypress.enter="newTask"
          v-model="titleNew"
        >

      </div>
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
    </div>
  </div>

</template>

<script lang="ts" setup>
import { useTaskStore } from '@/stores/tasks';
import { nextTick, onMounted } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const store = useTaskStore();

const task = ref(false);
const titleNew = ref("");
const titleInput = ref()

onMounted(() => {
  store.getMine()
})

const newTask = () => {
  store.addTask(titleNew.value, undefined, undefined)
  titleNew.value = ""; 
  task.value = false;
}

async function showNewTask() {
  task.value = true;
  await nextTick()
  titleInput.value.focus();
}

</script>
