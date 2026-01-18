import type { Request, Response } from "express";
import { db } from "../config/firebase.js";
import { Todo } from "../models/productModel.js";


const COLLECTION_NAME = "todos";
const isValidTitle = (title : any) => {
  if(!title || typeof title !== 'string' || title.trim().length === 0) { 
    return false ;
  }
  return true; 
}
export const getTodos = async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    const listTodos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(listTodos);
  } catch (error) {
    res.status(500).json({ message: "Falied to get data from firebase" });
  }
};
export const getTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const docSnap = await db.collection(COLLECTION_NAME).doc(`${id}`).get();
    if (!docSnap.exists) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({
      id: docSnap.id,
      ...docSnap.data(),
    });
  } catch (error) {
    res.status(500).json({ message: `Can't get this ID` });
  }
};
export const createTodos = async (req: Request, res: Response) => {
  try {
    const { title, description,startedAt,dueAt }: Todo = req.body;
    if(!isValidTitle(title)) {
      res
        .status(400)
        .json({ message: "Title is required" });
        return;
    }
    const newTodoData = {
      title,
      description,
      startedAt,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      dueAt
    };
    const docRef = await db.collection(COLLECTION_NAME).add(newTodoData);
    const responseData: Todo = {
      id: docRef.id,
      ...newTodoData,
    };
    res.status(201).json({
      message: "Thêm thành công!",
      data: responseData,
    }); return;
  } catch (error) {
    res.status(500).json({ message: "Failed to save data", error });
    return;
  }
};
export const removeTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.collection(COLLECTION_NAME).doc(id).delete();
    res.status(200).json({ message: `Deleted ID: ${id}` });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error });
  }
};
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dataChanged: Partial<Todo> = req.body;
    if (Object.keys(dataChanged).length === 0) {
      res.status(400).json({ message: "Empty data can't not update" });
      return;
    }
    const dataToUpdate = {
      ...dataChanged,
      updatedAt: new Date().toISOString(),
    };
    
    await db.collection(COLLECTION_NAME).doc(id).update(dataToUpdate);
    res.status(200).json({ message: "Updated successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to Update", error });
    return;
  }
};
