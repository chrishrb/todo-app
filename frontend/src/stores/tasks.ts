import { defineStore } from "pinia";

export type Task = {
  name: string;
  checked: boolean;
};

function init() {
  const task1: Task = {name: "Task 1", checked: false};
  const task2: Task = {name: "Task 2", checked: true};
  return [task1, task2]
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: init(),
  }),
  actions: {
    add(task: Task) {
      this.tasks.push(task);
    },
    toggleChecked(id: any) {
      if (!this.tasks.at(id)) {
        return;
      }
      this.tasks.at(id)!.checked = !this.tasks.at(id)!.checked;
    }
  }
});
