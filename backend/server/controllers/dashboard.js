import Project from "../models/Project.js";
import Task from "../models/task.js";
import TimeLog from "../models/timeLog.js";


export const getDashboardAnalytics = async (req, res) => {
    try {
        // Get total project count
        const totalProjects = await Project.countDocuments();

        // Get total task count
        const totalTasks = await Task.countDocuments();

        // Calculate total working hours from timelogs
        const timeLogs = await TimeLog.find();

        let totalWorkingHours = 0;

        timeLogs.forEach((log) => {
            if (log.startTime && log.endTime) {
                const start = new Date(log.startTime);
                const end = new Date(log.endTime);

                // Calculate duration in hours and add to totalWorkingHours
                const durationInHours = (end - start) / (1000 * 60 * 60);
                totalWorkingHours += durationInHours;
            }
        });

        // Response with analytics
        return res.status(200).json({
            status: 200,
            message: "Dashboard analytics fetched successfully.",
            data: {
                totalProjects,
                totalTasks,
                totalWorkingHours: totalWorkingHours.toFixed(2), // Rounded to 2 decimal places
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};
