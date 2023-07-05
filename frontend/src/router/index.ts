import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import LoginView from '../views/login/LoginView.vue'
import RegistrationView from '../views/registration/RegistrationView.vue'
import RegistrationSuccessView from '../views/registration/RegistrationSuccessView.vue'
import SettingsView from '../views/settings/SettingsView.vue'
import SettingsSuccessView from '../views/settings/SettingsSuccessView.vue'
import CalendarView from '../views/calendar/CalendarView.vue'
import { useAuthStore } from "@/stores/auth"
import { useUserStore } from '@/stores/user'
import TaskDetails from '@/components/tasks/TaskDetails.vue'
import ErrorView from '../views/error/ErrorView.vue'
import NotFoundView from '../views/error/NotFoundView.vue'


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
          path: '/task/:taskId',
          name: 'taskdetails',
          component: TaskDetails,
        },
        {
          path: '/tag/:tag',
          name: 'tag',
          component: HomeView,
          children: [
            {
              path: '/tag/:tag/task/:taskId',
              name: 'tag-taskdetails',
              component: TaskDetails,
            },
          ]
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
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: ':taskId',
          name: 'calendarDetails',
          component: TaskDetails,
        }
      ]
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorView,
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundView,
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
