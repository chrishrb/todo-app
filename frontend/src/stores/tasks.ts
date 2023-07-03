import { defineStore } from "pinia";
import baseApi from '@/common/base-api.service';
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
    tasks: undefined as Task[] | undefined,
    task: undefined as Task | undefined,
    tags: undefined as string[] | undefined,
  }),
  actions: {
    async getMine(isChecked?: boolean, tagFilter?: string) {
      return baseApi.get("me/tasks", { params: { 'isChecked': isChecked, 'tag': tagFilter } })
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
          this.tasks?.push(res.data)
          if (this.tags?.indexOf(res.data.tag) === -1) {
            this.tags?.push(res.data.tag)
          }
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
    tasksForCalendar(): CalendarItem[] {
      if (!this.tasks) {
        return [];
      }
      return this.tasks.filter(e => !!e.dueDate).map(e => {
        const color = this.colorOfTag(e.tag);
        return {
          id: e.id,
          startDate: new Date(e.dueDate!),
          title: e.title,
          classes: ['basic-calendar-item', color ? color : 'bg-primary-500', e.isChecked ? 'line-through' : ''],
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

