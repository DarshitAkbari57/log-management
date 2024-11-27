import express from "express";
import { AddTask, DeleteTask, GetAllTasks, GetTaskById, UpdateTask } from "../controllers/task.js";

const router = express.Router();

// Routes
router.post("/add", AddTask);
router.get("/", GetAllTasks);
router.get("/:id", GetTaskById);
router.put("/:id", UpdateTask);
router.delete("/:id", DeleteTask);

export default router;
