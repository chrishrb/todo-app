<template>
  <TaskDetails/>
  <div class="flex flex-row">
    <div class="flex flex-col flex-grow">
      <!-- tasklist -->
      <div v-for="(item, key) in store.tasks" :key="key">
        <TaskItem :item="item" />
      </div>

      <!-- new task -->
      <NewTask />
    </div>
  </div>

</template>

<script lang="ts" setup>
import TaskDetails from '@/components/tasks/TaskDetails.vue'
import { useTaskStore } from '@/stores/tasks';
import { onMounted, watch } from 'vue';
import TaskItem from '@/components/tasks/TaskItem.vue';
import NewTask from '@/components/tasks/NewTask.vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const store = useTaskStore();

onMounted(() => {
  store.getMine(undefined, route.params.tag as string)
});

watch(route, () => {
  store.getMine(undefined, route.params.tag as string)
});


</script>
