import User from "../models/user.js";

// Create a new user
export const AddUser = async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 400,
                message: "User already exists.",
            });
        }

        const user = await User.create({ first_name, last_name, email });

        return res.status(201).json({
            status: 201,
            message: "User created successfully.",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Get all users
export const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            status: 200,
            message: "Users retrieved successfully.",
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Get a user by ID
export const GetUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "User retrieved successfully.",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Update a user by ID
export const UpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            id,
            { first_name, last_name, email },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "User updated successfully.",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Delete a user by ID
export const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found.",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "User deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};
