import { defineStore } from "pinia";
import authApi from '@/common/auth-api.service';
import type { Task } from "@/schemas/task.schema";
import { FrontendError } from "@/exceptions/frontend.error";
import type { CalendarItem } from "@/schemas/calendar-item.schema";
import type { Tag } from "@/schemas/tag.schema";

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
    tasksWithDeleted: undefined as (Task | undefined)[] | undefined,
    task: undefined as Task | undefined,
    tags: undefined as string[] | undefined,
  }),
  actions: {
    async getMine(isChecked?: boolean, tagFilter?: string) {
      return authApi.get("me/tasks", { params: { 'isChecked': isChecked, 'tag': tagFilter } })
        .then((res) => {
          this.tasksWithDeleted = res.data;
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
    async fetchTask(id: string) {
      return authApi.get(`/tasks/${id}`)
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

      return authApi.patch(`/tasks/${id}/toggle`)
        .then((res) => {
          task.isChecked = res.data.isChecked
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details);
        })
    },
    async setDone() {
      if (this.task?.isChecked || this.task === undefined) {
        return;
      }

      return this.toggleChecked(this.task.id);
    },
    async addTask(title: string, description: string | undefined, dueDate: string | undefined, tag: string | undefined) {
      return authApi.post("me/tasks", { title, description, dueDate, tag })
        .then((res) => {
          this.tasksWithDeleted?.push(res.data)
          if (tag && this.tags?.indexOf(res.data.tag) === -1) {
            this.tags?.push(res.data.tag)
          }
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details);
        })
    },
    async updateTask(id: string, newTask: Task): Promise<Task> {
      const oldTask = this.tasks!.find(e => e.id === id);

      if (!oldTask) {
        throw new FrontendError(500, `task ${id} not found.`);
      }

      return authApi.put(`tasks/${newTask.id}`, newTask)
        .then((res) => {
          oldTask!.title = res.data.title;
          oldTask!.description = res.data.description;
          oldTask!.dueDate = res.data.dueDate;
          oldTask!.isChecked = res.data.isChecked;
          oldTask!.tag = res.data.tag;

          this.task = oldTask;

          if (oldTask?.tag && this.tags?.indexOf(res.data.tag) === -1) {
            this.tags?.push(res.data.tag)
          }

          return oldTask!;
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details);
        })
    },
    async getTags() {
      return authApi.get("me/tags")
        .then((res) => {
          this.tags = res.data;
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
    async deleteTask(id: string | undefined) {
      const idInList = this.tasks!.findIndex(e => e?.id === id);

      if (id == null || idInList == null) {
        throw new FrontendError(500, `task ${id} not found.`);
      }

      return authApi.delete(`tasks/${id}`)
        .then(() => {
          this.tasksWithDeleted![idInList] = undefined;
        })
        .catch((e) => {
          throw new FrontendError(e.response.data.errorCode, e.response.data.errorMessage, e.response.data.details)
        })
    },
  },
  getters: {
    tasks: (state): Task[] | undefined => {
      return state.tasksWithDeleted?.filter(e => e !== undefined) as Task[];
    },
    tasksForCalendar(): CalendarItem[] {
      if (!this.tasks) {
        return [];
      }
      return this.tasks.filter(e => !!e?.dueDate).map(e => {
        const color = this.colorOfTag(e?.tag);
        return {
          id: e?.id,
          startDate: new Date(e?.dueDate!),
          title: e?.title,
          classes: ['basic-calendar-item', color ? color : 'bg-primary-500', e?.isChecked ? 'line-through' : ''],
        } as CalendarItem;
      })
    },
    tagsWithColors: (state) => {
      if (!state.tags) {
        return [];
      }
      const tagsWithColorsList: Tag[] = [];
      for (let i = 0; i < state.tags.length; i++) {
        const index = i % COLORS.length;
        tagsWithColorsList.push({name: state.tags[i], color: COLORS[index]})
      }
      return tagsWithColorsList;
    },
    colorOfTag() {
      return (tag: string | undefined) => {
        if (!tag) {
          return;
        }
        return this.tagsWithColors.find(o => o.name === tag)?.color
      };
    }
  }
});

