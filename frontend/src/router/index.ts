import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import RegistrationView from '../views/registration/RegistrationView.vue'
import RegistrationSuccessView from '../views/registration/RegistrationSuccessView.vue'
import SettingsView from '../views/settings/SettingsView.vue'
import SettingsSuccessView from '../views/settings/SettingsSuccessView.vue'
import { useAuthStore } from "@/stores/auth"
<<<<<<< HEAD
import { useUserStore } from '@/stores/user'
=======
import TaskDetails from '@/components/tasks/TaskDetails.vue'
>>>>>>> 262d82a7f19a9ea5e1494b7c80794c7956174ee1


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
      children: [
        {
          path: ':taskId',
          name: 'taskdetails',
          component: TaskDetails,
        }
      ]
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
