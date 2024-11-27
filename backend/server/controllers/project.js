import Project from "../models/Project.js";
import Task from "../models/task.js";

// Create a new project
export const AddProject = async (req, res) => {
    try {
        const { created_by, name, category } = req.body;

        const project = await Project.create({ created_by, name, category });

        return res.status(201).json({
            status: 201,
            message: "Project created successfully.",
            data: project,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Get all projects
export const GetAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate(
            "created_by",
            "first_name last_name email"
        );

        // Add tasks to each project and create a new object
        const projectsWithTasks = await Promise.all(
            projects.map(async (project) => {
                const tasks = await Task.find({ projectId: project._id })
                    .populate("projectId", "name category")
                    .populate("userId", "first_name last_name email");
                return {
                    ...project.toObject(),
                    tasks, // Add the tasks as a new property
                };
            })
        );

        return res.status(200).json({
            status: 200,
            message: "Projects retrieved successfully.",
            data: projectsWithTasks, // Return the new array with tasks included
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Get a project by ID
export const GetProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id).populate(
            "created_by",
            "first_name last_name email"
        );

        if (!project) {
            return res.status(404).json({
                status: 404,
                message: "Project not found.",
            });
        }

        // Fetch tasks associated with the project
        const tasks = await Task.find({ projectId: project._id })
            .populate("projectId", "name category")
            .populate("userId", "first_name last_name email");

        // Create a new object combining project data and tasks
        const projectWithTasks = {
            ...project.toObject(), // Convert the project to a plain object to merge with tasks
            tasks, // Add tasks to the project object
        };

        return res.status(200).json({
            status: 200,
            message: "Project retrieved successfully.",
            data: projectWithTasks,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Update a project by ID
export const UpdateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category } = req.body;

        const project = await Project.findByIdAndUpdate(
            id,
            { name, category },
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({
                status: 404,
                message: "Project not found.",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Project updated successfully.",
            data: project,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};

// Delete a project by ID
export const DeleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({
                status: 404,
                message: "Project not found.",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Project deleted successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server error",
            error: error.message,
        });
    }
};
