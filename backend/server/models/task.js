import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        dueDate: { type: Date, required: true }, // New field
        TimerRunning: { type: Boolean, required: false, default: false }, // New field
        priority: {
            type: String,
            enum: ["Low", "Moderate", "High"],
            required: true, // New field
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
