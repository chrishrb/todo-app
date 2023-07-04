import type { Task } from "@/schemas/task.schema";
import dayjs from 'dayjs'

export function isTaskDue(dueDate: Date | undefined): boolean {
  if (!dueDate) {
    return false;
  }
  return new Date(dueDate) < new Date();
}

export function hasAnyChanges(task: Task, editedTask: Task) {
  const hasChanges = !(
    task.title === editedTask.title &&
    task.description === editedTask.description &&
    isSameDate(task.dueDate,editedTask.dueDate) &&
    task.tag === editedTask.tag
  )

  return hasChanges;
}

const isSameDate = (a: Date | undefined, b: Date | undefined) => a === undefined && b === undefined
  ? true
  : (a ? dayjs(a) : null)?.isSame(b, 'minute');
