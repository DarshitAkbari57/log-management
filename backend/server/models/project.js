import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
    }
);

const Project = new mongoose.model("Project", projectSchema);

export default Project;