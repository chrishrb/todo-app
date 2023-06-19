import { defineStore } from "pinia";
import baseApi from '@/common/base-api.service';
import type { Task } from "@/schemas/task.schema";
import { FrontendError } from "@/exceptions/frontend.error";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: undefined as Task[] | undefined
  }),
  actions: {
    async getMine() {
      // TODO: query only for tasks which are in range
      return baseApi.get("me/tasks")
        .then((res) => {
          this.tasks = res.data;
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
    async toggleChecked(id: any) {
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
    async addTask(title: string, description: string | undefined, dueDate: string | undefined) {
      return baseApi.post("me/tasks", { title, description, dueDate })
        .then((res) => {
          this.tasks!.unshift(res.data)
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    }
  }
});

