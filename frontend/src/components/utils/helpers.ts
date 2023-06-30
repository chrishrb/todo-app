export function isTaskDue(dueDate: string | undefined): boolean {
  if (!dueDate) {
    return false;
  }
  return new Date(dueDate) < new Date();
}
