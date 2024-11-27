import express from "express";
import { AddProject, DeleteProject, GetAllProjects, GetProjectById, UpdateProject } from "../controllers/project.js";

const router = express.Router();

// Routes
router.post("/add", AddProject);
router.get("/", GetAllProjects);
router.get("/:id", GetProjectById);
router.put("/:id", UpdateProject);
router.delete("/:id", DeleteProject);

export default router;
