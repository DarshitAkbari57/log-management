import Task from "../models/task.js";
import TimeLog from "../models/timeLog.js";

// Create a new task
export const AddTask = async (req, res) => {
    try {
        const { title, description, projectId, userId, dueDate, priority } = req.body;

        const task = await Task.create({ title, description, projectId, userId, dueDate, priority });

        return res.status(201).json({
            status: 201,
            message: "Task created successfully.",
            data: task,
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};


// Get all tasks
export const GetAllTasks = async (req, res) => {
    try {
        // Fetch all tasks and populate project and user data
        const tasks = await Task.find()
            .populate("projectId", "name category")
            .populate("userId", "first_name last_name email");

        // Use Promise.all to handle the asynchronous calls for time logs
        const tasksWithTimeSpent = await Promise.all(
            tasks.map(async (task) => {
                // Fetch the time logs for the current task
                const timeLogs = await TimeLog.find({ taskId: task._id });

                // Calculate the total time spent (in seconds)
                let totalTimeSpent = 0;
                timeLogs.forEach(log => {
                    const timeSpent = (new Date(log.endTime) - new Date(log.startTime)) / 1000; // Time in seconds
                    totalTimeSpent += timeSpent;
                });

                // Add the total time spent to the task object
                return {
                    ...task.toObject(),
                    totalTimeSpent // Add the total time spent as a new property
                };
            })
        );

        // Send response with tasks that include total time spent
        return res.status(200).json({
            status: 200,
            message: "Tasks retrieved successfully.",
            data: tasksWithTimeSpent,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Get a task by ID
export const GetTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id)
            .populate("projectId", "name category")
            .populate("userId", "first_name last_name email");

        if (!task) {
            return res.status(404).json({
                status: 404,
                message: "Task not found.",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Task retrieved successfully.",
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Update a task by ID
export const UpdateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, projectId, userId, dueDate, priority } = req.body;

        const task = await Task.findByIdAndUpdate(
            id,
            { title, description, projectId, userId, dueDate, priority },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                status: 404,
                message: "Task not found.",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Task updated successfully.",
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Delete a task by ID
export const DeleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({
                status: 404,
                message: "Task not found.",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Task deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};
