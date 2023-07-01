import { defineStore } from "pinia";
import baseApi from '@/common/base-api.service';
import type { Task } from "@/schemas/task.schema";
import { FrontendError } from "@/exceptions/frontend.error";
import type { CalendarItem } from "@/schemas/calendar-item.schema";

const COLORS = [
  'bg-green-500',
  'bg-red-500',
  'bg-blue-500',
  'bg-orange-500',
  'bg-yellow-500'
]

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: undefined as Task[] | undefined,
    task: undefined as Task | undefined,
    tags: undefined as string[] | undefined,
  }),
  actions: {
    async getMine(isChecked?: boolean, tagFilter?: string) {
      // TODO: query only for tasks which are in range
      return baseApi.get("me/tasks", { params: { 'isChecked': isChecked, 'tag': tagFilter} })
        .then((res) => {
          this.tasks = res.data;
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
    async fetchTask(id: string) {
      return baseApi.get(`/tasks/${id}`)
        .then((res) => {
          this.task = res.data;
          return res.data as Task;
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
    async toggleChecked(id: string) {
      const task = this.tasks!.find(e => e.id === id);

      if (!task) {
        throw new FrontendError(500, `task ${id} not found.`)
      }

      return baseApi.patch(`/tasks/${id}/toggle`)
        .then((res) => {
          task.isChecked = res.data.isChecked
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
    async setDone() {
      if (this.task?.isChecked || this.task === undefined) {
        return;
      }

      return this.toggleChecked(this.task.id);
    },
    async addTask(title: string, description: string | undefined, dueDate: string | undefined, tag: string | undefined) {
      return baseApi.post("me/tasks", { title, description, dueDate, tag })
        .then((res) => {
          this.tasks!.push(res.data)
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
    async getTags() {
      return baseApi.get("me/tags")
        .then((res) => {
          this.tags = res.data;
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
  },
  getters: {
    tasksForCalendar: (state) => {
      if (!state.tasks) {
        return [];
      }
      return state.tasks.filter(e => !!e.dueDate && e.isChecked === false).map(e => {
        return {
          id: e.id,
          startDate: new Date(e.dueDate!),
          title: e.title,
          classes: ['basic-calendar-item'],
          // TODO: change background color based on tag
          style: 'background-color: #3B82F6;'
        } as CalendarItem;
      })
    },
    tagsWithColors: (state) => {
      if (!state.tags) {
        return {};
      }
        const tagColorDict: { [key: string]: string } = {};
      
        for (let i = 0; i < state.tags.length; i++) {
          const index = i % COLORS.length;
          tagColorDict[state.tags[i]] = COLORS[index];
        }
        console.log(tagColorDict)
        return tagColorDict;
    }
  }
});

