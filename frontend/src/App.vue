<template>
    <div class="p-4 ml-80">
      <router-view></router-view>
    </div>
</template>

<script lang="ts">
import AppSidebar from "@/components/common/AppSidebar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'App',
  components: {
    AppSidebar,
  }
});
</script>
