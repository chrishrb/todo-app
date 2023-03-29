<template>
  <main>
    <section v-if="errored">
      <p>Error, bro</p>
    </section>
    <section v-else>
      <div v-if="loading">Loading..</div>

      <div 
        v-else 
        v-for="user in info"
      >
        {{ user }}
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import baseApi from '@/common/base-api.service';
import { defineComponent } from 'vue';
import { useAuthStore } from "@/stores/auth"

export default defineComponent({
  name: "home-view",
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      info: null,
      loading: true,
      errored: false,
    }
  },
  mounted() {
    baseApi.get('/users', { headers: {"Authorization": `Bearer ${this.authStore.token}`}})
      .then(response => {
        this.info = response.data
      })
      .catch(error => {
        console.error(error)
        this.errored = true
      })
      .then(() => this.loading = false);
  }

});
</script>

