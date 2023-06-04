import { defineStore } from "pinia";
import baseApi from '@/common/base-api.service';
import type { TaskSchema } from "@/schemas/task.schema";

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: undefined as TaskSchema[] | undefined
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
          console.log(e)
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
    }
  }
});

