<template>
  <div id="home">
    <AppLogin/>
  </div>
</template>

<script lang="ts">
import AppLogin from "@/components/AppLogin.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'App',
  components: {
    AppLogin,
  }
});
</script>
