import express from "express";
import { getDashboardAnalytics } from "../controllers/dashboard.js";

const router = express.Router();

// Route for fetching dashboard analytics
router.get("/analytics", getDashboardAnalytics);

export default router;
