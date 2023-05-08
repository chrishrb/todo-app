<template>
  <main>
    <section>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <ul>
          <li>
            <label for="email">E-Mail:</label>
            <input type="email" v-model="email">
          </li>
          <li>
            <label for="password">Password:</label>
            <input type="password" v-model="password">
          </li>
          <li>
            <button type="submit">Submit</button>
          </li>
        </ul>
      </form>
    </section>
  </main>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from "@/stores/auth"
import router from '@/router';

export default defineComponent({
  name: "login-component",
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      // TODO: remove
      email: "root@example.com",
      password: "root",
    }
  },
  methods: {
    async login() {
      await this.authStore.login(this.email, this.password);
      router.push('/home')
    }
  }
});
</script>

