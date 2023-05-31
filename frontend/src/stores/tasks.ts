import { defineStore } from "pinia";
import baseApi from '@/common/base-api.service';
import { useAuthStore } from "./auth";
import type { Task } from "@/schemas/task.schema";

async function init() {
  const authStore = useAuthStore()

  const tasks = await baseApi.get("me/tasks");
  console.log("TASKS: ", tasks)

  return authStore.isLoggedIn ? tasks : null;
}

type RootState = {
  tasks: Task[];
}

export const useTaskStore = defineStore({
  id: "task",
  state: () => ({
    tasks: [],
  } as RootState),
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
    // add(task: Task) {
    //   // this.tasks.push(task);
    // },
    toggleChecked(id: any) {
      if (!this.tasks.at(id)) {
        return;
      }
      this.tasks.at(id)!.isChecked = !this.tasks.at(id)!.isChecked;
    }
  }
});

