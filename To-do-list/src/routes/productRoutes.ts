import { Router } from "express";
import * as productController from "../controllers/productController.js"

const router = Router();

// Define routes
router.get('/', productController.getTodos);
router.get('/:id',productController.getTodo);
router.post('/',productController.createTodos);
router.put('/:id',productController.updateTodo);
router.delete('/:id',productController.removeTodo);
export default router;