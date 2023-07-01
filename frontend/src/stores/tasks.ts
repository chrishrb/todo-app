import { defineStore } from "pinia";
import baseApi from '@/common/base-api.service';
import type { Task } from "@/schemas/task.schema";
import { FrontendError } from "@/exceptions/frontend.error";
import type { CalendarItem } from "@/schemas/calendar-item.schema";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: undefined as Task[] | undefined,
    task: undefined as Task | undefined,
  }),
  actions: {
    async getMine(isChecked?: boolean) {
      return baseApi.get("me/tasks", { params: { 'isChecked': isChecked } })
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
    async addTask(title: string, description: string | undefined, dueDate: string | undefined) {
      return baseApi.post("me/tasks", { title, description, dueDate })
        .then((res) => {
          this.tasks!.push(res.data)
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    }
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
    }
  }
});

