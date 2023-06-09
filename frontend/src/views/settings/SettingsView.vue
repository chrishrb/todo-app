<template>
  <div>
    <SidebarComponent/>
    <div  class="p-4 ml-80">
      <SettingsForm/>
    </div>
  </div>
</template>
  
<script lang="ts" setup>
import SettingsForm from '@/components/settings/SettingsForm.vue'
import SidebarComponent from '@/components/common/SidebarComponent.vue';
</script>
