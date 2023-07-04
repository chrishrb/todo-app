export type Task = {
  id: string,
  title: string,
  userId: string,
  description: string | undefined,
  dueDate?: Date,
  isChecked: boolean,
  tag: string
}
