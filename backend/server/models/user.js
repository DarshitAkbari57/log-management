import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
});

const User = new mongoose.model("User", userSchema);

export default User;