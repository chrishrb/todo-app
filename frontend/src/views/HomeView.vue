<template>
  <div id="home">
    <Login/>
  </div>
</template>

<script lang="ts">
import Login from "@/components/Login.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'App',
  components: {
    Login,
  }
});
</script>
