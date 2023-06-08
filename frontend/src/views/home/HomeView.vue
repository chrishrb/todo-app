<template>
  <AppSidebar/>
  <div  class="p-4 ml-80">
    <AppTask/>
  </div>
</template>

<script lang="ts" setup>
import AppTask from '@/components/tasks/TaskList.vue'
import AppSidebar from '@/components/common/AppSidebar.vue';
</script>
