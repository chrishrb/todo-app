import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import SettingsView from '../views/SettingsView.vue'
import RegistrationSuccessView from '../views/RegistrationSuccessView.vue'
import { useAuthStore } from "@/stores/auth"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const authStore = useAuthStore()
        return authStore.isLoggedIn ? '/home' : '/login'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegistrationView,
    },
    {
      path: '/registerSuccess',
      name: 'registerSuccess',
      component: RegistrationSuccessView,
      beforeEnter: (to, from, next) => {
        if (from && from.name === 'register') {
          next()
        } else {
          next({ name: 'login' })
        }
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: {
        requiresAuth: true,
      }
    }
  ]
})

router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
