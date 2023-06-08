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

    <div class="flex flex-col flex-grow">
      <!-- new task -->
      <NewTask v-show="task" @close-new-task="task == false"/>
      
      <!-- tasklist -->
      <div v-for="(item, key) in store.tasks">
        <TaskItem :item="item" />
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { useTaskStore } from '@/stores/tasks';
import { nextTick, onMounted, ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import TaskItem from '@/components/main/TaskItem.vue';
import NewTask from '@/components/main/NewTask.vue';

const store = useTaskStore();

// Show switches
const task = ref(false);

onMounted(() => {
  store.getMine()
})

async function showNewTask() {
  task.value = true;
  await nextTick()
}

</script>
