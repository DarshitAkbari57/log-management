import express from "express";
import { AddUser, DeleteUser, GetAllUsers, GetUserById, UpdateUser } from "../controllers/user.js";

const router = express.Router();

// Routes
router.post("/add", AddUser);
router.get("/", GetAllUsers);
router.get("/:id", GetUserById);
router.put("/:id", UpdateUser);
router.delete("/:id", DeleteUser);

export default router;
