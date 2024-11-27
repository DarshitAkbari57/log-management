import express from "express";
import { AddTimeLog, DeleteTimeLog, GetAllTimeLogs, GetTimeLogById, UpdateTimeLog } from "../controllers/timeLog.js";

const router = express.Router();

// Routes
router.post("/add", AddTimeLog);
router.get("/", GetAllTimeLogs);
router.get("/:id", GetTimeLogById);
router.put("/:id", UpdateTimeLog);
router.delete("/:id", DeleteTimeLog);

export default router;
