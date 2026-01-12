import type { Request, Response } from "express";
import {db} from "../config/firebase.js";
import { Todo } from "../models/productModel.js"


const COLLECTION_NAME = "todos";
export const getTodos = async (req:Request,res:Response) => {
  try {
      const snapshot = await db.collection(COLLECTION_NAME).get();
  if (snapshot.empty) {
    res.send(200).json([]);
  }
  const listTodos = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  res.status(200).json(listTodos);
  }
  catch (error){
    res.status(500).json({message: 'Falied to get data from firebase'})
  }
}
export const getTodo = async (req:Request,res:Response) => {
  try {
    const {id} = req.params;
    const docSnap = await db.collection(COLLECTION_NAME).doc(`${id}`).get();
    res.send(200).json({
      id: docSnap.id,
      ...docSnap.data()
    })
  }
  catch (error) {
    res.send(500).json({message: `Can't get this ID` })
  }
}
export const createTodos = async (req:Request,res:Response) => {
  try {
    const newTodoData: Todo = req.body;
    const docRef = await db.collection(COLLECTION_NAME).add(newTodoData);
    const responseData :Todo =  {
      id:docRef.id,
      ...newTodoData
    }
    res.send(201).json({
      message: "Thêm thành công!",
      data: responseData,
    });
  }
catch (error) {
        res.status(500).json({ message: "Failed to save data", error });
    }
}
export const removeTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await db.collection(COLLECTION_NAME).doc(id).delete();
      res.status(200).json({ message: `Deleted ID: ${id}` });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete", error });
    }
}
export const updateTodo = async (req: Request, res: Response) => {
    try {
      const {id} = req.params;
      const dataToUpdate: Partial<Todo> = req.body;
      await db.collection(COLLECTION_NAME).doc(id).update(dataToUpdate);
      res.status(200).json({ message: "Updated successfully" });
    }
    catch(error) {
      res.status(500).json({ message: "Failed to Update", error });
    }
}