<template>
  <div>
    <SidebarComponent/>
    <div class="p-4 ml-80">
      <AppTask />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppTask from '@/components/tasks/Tasks.vue'
import SidebarComponent from '@/components/common/SidebarComponent.vue';
</script>
