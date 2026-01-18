export interface Todo {
  id?: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  startedAt?: string;
  createdAt: string;
  dueAt?: string;
}
