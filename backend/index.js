import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import "./server/config/database.js"
import UserRoutes from "./server/routes/user.js"
import ProjectRoutes from "./server/routes/project.js"
import TaskRoutes from "./server/routes/task.js"
import TimeLogRoutes from "./server/routes/timeLog.js"
import DashboardRoutes from "./server/routes/dashboard.js"

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res, next) => {
    res.send("HELLO");
});

// API Routes
app.use("/api/users", UserRoutes);
app.use("/api/projects", ProjectRoutes);
app.use("/api/tasks", TaskRoutes);
app.use("/api/timelogs", TimeLogRoutes);
app.use("/api/dashboard", DashboardRoutes);


app.listen(PORT, "0.0.0.0", () => {
    console.log(`START ON PORT ${PORT}`);
});
