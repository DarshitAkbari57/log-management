import mongoose from "mongoose";

const timeLogSchema = new mongoose.Schema(
    {
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        startTime: { type: Date, required: false },
        endTime: { type: Date, required: false },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
    }
);

const TimeLog = new mongoose.model("TimeLog", timeLogSchema);

export default TimeLog;