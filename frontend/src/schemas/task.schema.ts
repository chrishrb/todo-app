export type Task = {
  id: string,
  title: string,
  userId: string,
  description: string | null,
  dueDate?: string,
  isChecked: boolean,
  tag: string
}
