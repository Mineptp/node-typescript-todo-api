import { Request,Response } from "express"
import * as TodoModel from '../controllers/productModel';

export const getTodos = (req:Request, res:Response) => {
    const todos = TodoModel.getAll();
    res.json(todos);
}
export const getTodo = (req:Request, res:Response) => {
    const id = req.params.id && parseInt(req.params.id);
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
    const newTodo = TodoModel.createId(title, "your description here"); ;
    res.status(201).json(newTodo);
}
export const updateTodo = (req:Request, res:Response) => {
    const id = req.params.id && parseInt(req.params.id);
    const updatedTodo = TodoModel.update(id,req.body);
    if(!updateTodo) {
        return res.status(404).json({error: 'Todo not found'});
    }
    return res.json(updatedTodo);
}

export const removeTodo = (req:Request,res:Response) => {
    const id = req.params.id && parseInt(req.params.id);
    const success = TodoModel.remove(id);
    if(!success) {
        return res.status(404).json({error: 'Todo not found'}); 
    }
    return res.json({ message: "Đã xóa thành công" });
}