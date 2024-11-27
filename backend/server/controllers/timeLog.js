import Task from "../models/task.js";
import TimeLog from "../models/timeLog.js";

// Create a new time log
export const AddTimeLog = async (req, res) => {
    try {
        const { taskId, userId, startTime, endTime } = req.body;

        // Check if a time log already exists for the given taskId and userId
        const existingTimeLog = await TimeLog.findOne({ taskId, userId, endTime: null });

        // Find the task by its ID
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({
                status: 404,
                message: "Task not found.",
            });
        }

        // Toggle the TimerRunning field
        const updatedTimerRunning = task.TimerRunning === true ? false : true; // Flip the value

        // Update the TimerRunning field in the task document
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { TimerRunning: updatedTimerRunning }, // Set the new TimerRunning value
            { new: true } // Return the updated task document
        );

        if (existingTimeLog) {
            // If the time log exists, update the endTime
            existingTimeLog.endTime = endTime;
            await existingTimeLog.save(); // Save the updated time log

            // Optionally, you can return a success message indicating the time log was updated
            return res.status(200).json({
                status: 201,
                message: "Time log updated successfully.",
                data: existingTimeLog,
            });
        } else {
            // If no existing time log, create a new one
            const timeLog = await TimeLog.create({ taskId, userId, startTime, endTime });

            return res.status(201).json({
                status: 201,
                message: "Time log created successfully.",
                data: timeLog,
            });
        }


    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};


// Get all time logs
export const GetAllTimeLogs = async (req, res) => {
    try {
        const timeLogs = await TimeLog.find()
            .populate("taskId", "title description")
            .populate("userId", "first_name last_name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: 200,
            message: "Time logs retrieved successfully.",
            data: timeLogs,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Get a time log by ID
export const GetTimeLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const timeLog = await TimeLog.findById(id)
            .populate("taskId", "title description")
            .populate("userId", "first_name last_name email");

        if (!timeLog) {
            return res.status(404).json({
                status: 404,
                message: "Time log not found.",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Time log retrieved successfully.",
            data: timeLog,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Update a time log by ID
export const UpdateTimeLog = async (req, res) => {
    try {
        const { id } = req.params;
        const { taskId, userId, startTime, endTime } = req.body;

        const timeLog = await TimeLog.findByIdAndUpdate(
            id,
            { taskId, userId, startTime, endTime },
            { new: true, runValidators: true }
        );

        if (!timeLog) {
            return res.status(404).json({
                status: 404,
                message: "Time log not found.",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Time log updated successfully.",
            data: timeLog,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Delete a time log by ID
export const DeleteTimeLog = async (req, res) => {
    try {
        const { id } = req.params;

        const timeLog = await TimeLog.findByIdAndDelete(id);

        if (!timeLog) {
            return res.status(404).json({
                status: 404,
                message: "Time log not found.",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Time log deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};
