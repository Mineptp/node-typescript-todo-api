import type { Request, Response } from 'express';
import * as TodoModel from "../model/productModel.js";
export const getTodos = (req:Request, res:Response) => {
    const todos = TodoModel.getAll();
    res.json(todos);
}
export const getTodo = (req:Request  <{id: string}>, res:Response) => {
    const id = parseInt(req.params.id);
   if (isNaN(id)) {
     return res.status(400).json({ message: "ID phải là số" });
   }
    const todo = TodoModel.getById(id);
    if (!todo) {
        res.send(404).json({'message' : 'Can not find id'})
    }
    return res.send(201).json(todo);
}
export const createTodos = (req:Request, res:Response) => {
    const {title, description} = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const newTodo = TodoModel.createId(title, "your description here"); 
    res.status(201).json(newTodo);
}
export const updateTodo = (req: Request<{ id: string }>, res: Response) => {
  const id =  parseInt(req.params.id);
   if (isNaN(id)) {
     return res.status(400).json({ message: "ID phải là số" });
   }
  const updatedTodo = TodoModel.update(id, req.body);
  if (!updateTodo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  return res.json(updatedTodo);
};

export const removeTodo = (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID phải là số" });
    }
  const success = TodoModel.remove(id);
  if (!success) {
    return res.status(404).json({ error: "Todo not found" });
  }
  return res.json({ message: "Đã xóa thành công" });
};