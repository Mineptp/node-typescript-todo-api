import { todo } from "node:test";

export interface Todo {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
}
