<template>
  <div id="sidebar"
    class="fixed top-0 left-0 bottom-0 w-80 bg-white border-r border-gray-200 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0">
    <!-- logo -->
    <AppLogo />
    <!-- logo -->

    <nav class="hs-accordion-group pb-5 pl-5 pr-5 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
      <ul class="space-y-1.5">
        <li class="hs-accordion active" id="tasks-accordion">
          <a class="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-base text-slate-700 rounded-md hover:text-primary-600"
            href="javascript:;">
            <QueueListIcon class="w-5 h-5" />
            {{ $t ('todayTasks')}}

            <ChevronUpIcon
              class="hs-accordion-active:block ml-auto hidden w-4 h-4 text-gray-600 group-hover:text-gray-500" />
            <ChevronDownIcon
              class="hs-accordion-active:hidden ml-auto block w-4 h-4 text-gray-600 group-hover:text-gray-500" />
          </a>

          <div id="tasks-accordion"
            class="hs-accordion-content active w-full overflow-hidden px-5 transition-[height] duration-300">
            <ul class="pl-2 border-l-2">
              <li>
                <a class="flex items-center gap-x-1.5 text-base px-2 py-2 text-slate-700 rounded-md" href="javascript:;">
                  <span class="w-2.5 h-2.5 inline-block bg-red-500 rounded-full mr-2"></span>
                  {{ $t ('personal')}}
                </a>
              </li>
              <li>
                <a class="flex items-center gap-x-1.5 text-base px-2 py-2 text-slate-700 rounded-md" href="javascript:;">
                  <span class="w-2.5 h-2.5 inline-block bg-green-500 rounded-full mr-2"></span>
                  {{ $t ('work')}}
                </a>
              </li>
              <li>
                <a class="flex items-center gap-x-1.5 text-base px-2 py-2 text-slate-700 rounded-md" href="javascript:;">
                  <span class="w-2.5 h-2.5 inline-block border-orange-500 border-2 rounded-full mr-2"></span>
                  {{ $t ('study')}}
                </a>
              </li>
            </ul>
          </div>
        </li>

        <li>
          <a class="flex items-center gap-x-3.5 py-2 px-2.5 text-slate-700 text-base rounded-md hover:text-primary-600"
            href="javascript:;">
            <CalendarDaysIcon class="w-5 h-5" />
            {{ $t ('scheduledTasks')}}
          </a>
        </li>

      </ul>
    </nav>
    <div class="sticky top-[100vh]">
      <ul class="space-y-1.5 pb-2 pl-5 pr-5">
        <li>
          <div>
            <router-link class="flex items-center gap-x-3.5 py-2 px-2.5 text-slate-700 text-base rounded-md hover:text-primary-600 cursor-pointer" to="/settings">
              <Cog8ToothIcon class="w-5 h-5" />
              {{ $t ('settings')}}
            </router-link>
          </div>
          <a class="flex items-center gap-x-3.5 py-2 px-2.5 text-slate-700 text-base rounded-md hover:text-primary-600 cursor-pointer" @click="logout">
            <ArrowLeftOnRectangleIcon class="w-5 h-5" />
            {{ $t ('logout')}}
          </a>
        </li>
      </ul>
      <div class="flex-shrink-0 group block border-t-2 p-4">
        <div class="flex items-center">
          <div class="inline-block flex-shrink-0 h-[3.875rem] w-[3.875rem] rounded-full overflow-hidden">
            <div v-if="profile" class="bg-blue-500 text-white flex items-center justify-center text-xl font-semibold h-full w-full">
              {{ profile.firstName.charAt(0).toUpperCase() }} {{ profile.lastName.charAt(0).toUpperCase() }}
            </div>
          </div>
          <div v-if="profile" class="ml-3">
            <h3 class="font-semibold text-gray-800">{{ profile.firstName }} {{ profile.lastName }}</h3>
            <p class="text-sm font-medium text-gray-400">{{ profile.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import AppLogo from "@/components/common/AppLogo.vue";
import { useAuthStore } from "@/stores/auth"
import { useUserStore } from '@/stores/user';
import { QueueListIcon, ChevronUpIcon, ChevronDownIcon, CalendarDaysIcon, Cog8ToothIcon, ArrowLeftOnRectangleIcon } from "@heroicons/vue/24/outline"

const authStore = useAuthStore();
const userStore = useUserStore();

const profile = computed(() => userStore.getProfile);

const logout = () => {
  authStore.logout()
};

</script>
