<template>
  <div>
    <SidebarComponent/>
    <div class="p-4 ml-80">
      <TaskList />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TaskList from '@/components/tasks/TaskList.vue'
import SidebarComponent from '@/components/common/SidebarComponent.vue';
</script>
