export type TaskSchema = {
  id: string,
  title: string,
  userId: string,
  description: string | null,
  dueDate: string | undefined | null,
  isChecked: boolean
}
