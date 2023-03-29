import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from "@/stores/auth"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
    }
  ]
})

router.beforeResolve(async (to: any, from: any, next: any) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated && to.name !== 'home') {
    next({ name: 'home' })
    return false;
  }

  next();
});

export default router

