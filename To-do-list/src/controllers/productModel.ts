import { todo } from "node:test";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// 2. Data Store: Kho chứa (Array)
// Cú pháp: `: Todo[]` nghĩa là "Biến này chỉ được phép chứa một Mảng, và các phần tử bên trong BẮT BUỘC phải là Todo".
let todos: Todo[] = [
  {
    id: 1,
    title: "Học TypeScript",
    description: "Học cơ bản",
    completed: false,
  },
  { id: 2, title: "Đi ngủ sớm", description: "Ngur mo ngay", completed: true },
];

export const getAll = (): Todo[] => {
  return todos;
};
export const getById = (id: number): Todo | null => {
  return todos.find((t) => t.id === id) || null;
}
export const createId = (title: string, description: string): Todo => {
  const lastTodo = todos[todos.length - 1];
  const newId = todos.length > 0 ? lastTodo ? (lastTodo.id + 1 : 1);
  const newTodo: Todo = {
    id ?: newId,
    title: title,
    description: description,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export const update = (id : number, data: Partial<Todo>) => {
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...data };
    return todos[index];
  }
  return null;
};

export const remove = (id: number): boolean => {
  const intialLength = todos.length;
  todos = todos.filter((t) => t.id !== id);
  return todos.length !== intialLength;
};
