import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import SettingsView from '../views/SettingsView.vue'
import RegistrationSuccessView from '../views/RegistrationSuccessView.vue'
import SettingsSuccessView from '../views/SettingsSuccessView.vue'
import { useAuthStore } from "@/stores/auth"
import { useUserStore } from '@/stores/user'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
      path: '/register-success',
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
      path: '/settings-success',
      name: 'settingsSuccess',
      component: SettingsSuccessView,
      beforeEnter: (to, from, next) => {
        if (from && from.name === 'settings') {
          next()
        } else {
          next({ name: 'settings' })
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
  const userStore = useUserStore();
  if (to.meta.requiresAuth) {
    if (authStore.isLoggedIn) {
      if (!userStore.isProfileLoaded) {
        await userStore.getMe();
      }
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
