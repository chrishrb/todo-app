<template>
  <teleport to='body'>
    <div class="hs-overlay fixed top-0 left-0 z-[60] justify-center w-full h-full bg-black bg-opacity-10 overflow-hidden" v-show="isModalOpen">
      <div ref="modal" class="sm:w-[60%] m-3 sm:mx-auto mt-[10%] flex items-center h-min">

        <TaskEditForm
          :task="taskStore.task!"
          @close-modal="handleClose"
          @save-edit="handleSave"
          @close-edit="isEditing = false"
          v-if="isEditing"
        />
        <div v-else class="flex flex-col bg-white border shadow-sm rounded-xl w-full h-[30rem]">
          <div class="flex justify-between items-center py-3 px-4">
            <div class="flex justify-between items-center flex-row">
              <h1 class="text-2xl text-primary-600">
                {{ taskStore.task?.title }}
              </h1>
            </div>
            <div class="inline-flex justify-between items-center">

              <div class="mr-2 hs-tooltip inline-block [--trigger:click] [--placement:bottom]" id="tooltip">
                <div class="cursor-pointer hs-tooltip-toggle block text-center text-gray-500 hover:text-gray-400 focus:outline-none">
                  <TrashIcon class="w-6 h-6"/>
                    <button
                      class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-2 px-4 justify-center items-center rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
                      role="button"
                      @click="deleteTask"
                    >
                    {{ $t('confirm') }}
                  </button>
                </div>
              </div>
              <button
                class="mr-2 inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm"
                @click.stop="isEditing = true"
              >
                <PencilSquareIcon class="w-6 h-6" />
              </button>
              <button @click="handleClose" class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm">
                <span class="sr-only">{{ $t('close') }}</span>
                <XMarkIcon/>
              </button>
            </div>
          </div>
            <div
                class="px-4 py-2 self-start"
                v-show="taskStore.task?.tag">
                <div class="flex items-center">
                  <TagIcon class="h-5 w-5 mr-1"/>
                  <p class="font-bold"> {{ $t('tag') }} </p>
                </div>
                <p class="mt-1 text-gray-800">
                  <span class="w-2.5 h-2.5 inline-block rounded-full mr-2" :class="taskStore.colorOfTag(taskStore.task?.tag)"></span>
                    {{ taskStore.task?.tag}}
                </p>
              </div>
          <div
            class="px-4 py-2 self-start"
            :class="[{'text-red-500': isTaskDue(taskStore.task?.dueDate) && !taskStore.task?.isChecked}]"
            v-show="taskStore.task?.dueDate">
            <div class="flex items-center">
              <CalendarIcon class="h-5 w-5 mr-1"/>
              <p class="font-bold"> {{ $t('due') }} </p>
            </div>
            <p class="mt-1">
              {{ getFancyDateString(taskStore.task?.dueDate, locale)}}
            </p>
          </div>
          <div class="flex overflow-y-hidden pr-3 h-full">
            <div class="px-4 py-2 overflow-y-auto w-full">
              <div class="flex items-center">
                <ChatBubbleLeftRightIcon class="h-5 w-5 mr-1"/>
                <p class="font-bold"> {{ $t('description') }} </p>
              </div>
              <p class="whitespace-pre-line mt-1 text-gray-800 h-min w-full">
                {{ taskStore.task?.description }}
              </p>
            </div>
          </div>
          <div class="flex justify-end items-center py-2 px-4 border-t">
            <button @click="handleDone" type="button" class="py-2 px-4 inline-flex justify-center items-center rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
              {{ $t('done') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useTaskStore } from '@/stores/tasks';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';
import { getFancyDateString } from '../utils/formatter';
import { useI18n } from 'vue-i18n';
import { XMarkIcon } from "@heroicons/vue/24/solid"
import { TrashIcon, ChatBubbleLeftRightIcon, CalendarIcon, PencilSquareIcon, TagIcon} from "@heroicons/vue/24/outline"
import { isTaskDue } from '../utils/helpers';
import TaskEditForm from '@/components/tasks/TaskEditForm.vue';
import store from 'storejs';

const { locale } = useI18n();
const taskStore = useTaskStore();
const router = useRouter();


const modal = ref(null);
const isModalOpen = ref(false);
const isEditing = ref(false);

const taskId = ref(router.currentRoute.value.params.taskId) as Ref<string>;

onMounted(() => {
  if (taskId.value && !isModalOpen.value) {
    return taskStore.fetchTask(taskId.value)
      .then(() => {
        isModalOpen.value = true
      })
  }
})

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.taskId !== from.params.taskId && to.params.taskId) {
    return taskStore.fetchTask(to.params.taskId as string)
      .then((res) => {
        isModalOpen.value = true
        if (store.has(`__draft_${res.id}`)) {
          isEditing.value = true;
        } else {
          isEditing.value = false;
        }
      })
  }
})

onClickOutside(modal, () => {handleClose()})

async function handleClose() {
  if (isModalOpen.value === false) {
    return;
  }

  // close the delete menu if it's open
  try {
    (window as any).HSTooltip.hide(document.querySelector('#tooltip'));
  } catch(_) {
    // when hot reloading then this doesn‘t work
  }

  isModalOpen.value = false;
  isEditing.value = false;
  const parentRoute = router.currentRoute.value.matched.length >= 2 ? router.currentRoute.value.matched.slice(-2).shift() : router.currentRoute.value;
  await router.replace(parentRoute!)
}

function handleSave() {
  isEditing.value = false;
}

function handleDone() { 
  taskStore.setDone()
    .then(() => {
      handleClose();
    })
}

function deleteTask() {
  taskStore.deleteTask(taskStore.task?.id).then(() => {
    taskStore.getTags();
  })
  handleClose()
}

</script>
