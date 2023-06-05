import { defineStore } from "pinia";
import baseApi from '@/common/base-api.service';
import type { Task } from "@/schemas/task.schema";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: undefined as Task[] | undefined
  }),
  getters: {
    getTasks: (state) => state.tasks,
  },
  actions: {
    async getMine() {
     baseApi.get("me/tasks")
      .then((res) => {
          this.tasks = res.data;
      })
      .catch((e) => {
          throw(e)
      })
    },
    async toggleChecked(id: any) {

      const task = this.tasks!.find(e => e.id === id);

      if (!task) {
        console.log("task not found: ", task) 
        return;
      }

      baseApi.patch(`/tasks/${id}/toggle`)
        .then((res) => {
          task.isChecked = res.data.isChecked
        })
        .catch((e) => {
          throw(e)
        })
    },
    async addTask(title: string, description: string | undefined, dueDate: string | undefined) {
      baseApi.post("me/tasks", {title, description, dueDate})
        .then((res) => {
          this.tasks!.unshift(res.data)
        })
        .catch((e) => {
          throw(e)
        })
    }
  }
});

