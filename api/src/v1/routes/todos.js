import { Router } from "express";
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from "../../controllers/todos.js";
const router = Router();

router.get("/", getTodos);
router.post("/", createTodo)
router.get("/:id", getTodo)
router.put("/:id", updateTodo)
router.delete("/:id", deleteTodo)
export default router;