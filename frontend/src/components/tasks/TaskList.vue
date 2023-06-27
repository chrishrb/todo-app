<template>

  <div class="flex flex-row">
    <div class="flex flex-col flex-grow">
      <!-- tasklist -->
      <div v-for="(item, key) in store.tasks">
        <TaskItem :item="item" />
      </div>

      <!-- new task -->
      <NewTask />
    </div>
  </div>

</template>

<script lang="ts" setup>
import { useTaskStore } from '@/stores/tasks';
import { onMounted } from 'vue';
import TaskItem from '@/components/tasks/TaskItem.vue';
import NewTask from '@/components/tasks/NewTask.vue';

const store = useTaskStore();

onMounted(() => {
  store.getMine()
})

</script>
