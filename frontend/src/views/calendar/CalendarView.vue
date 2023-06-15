<template>
  <div>
    <SidebarComponent/>
    <div class="p-4 ml-80 flex flex-col h-screen">
      <ScheduledCalendar/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SidebarComponent from '@/components/common/SidebarComponent.vue';
import ScheduledCalendar from '@/components/scheduled/ScheduledCalendar.vue';
</script>
