// controllers/projectController.js
const Project = require('../models/projectModel');

// Create a new project
exports.createProject = async (req, res) => {
    const { name, description, teamMembers, tasks, startDate, endDate } = req.body;
    try {
        const project = new Project({
            name,
            description,
            teamMembers,
            tasks,
            startDate,
            endDate,
            createdBy: req.user.id
        });
        await project.save();
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create project' });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve projects' });
    }
};

// Get a specific project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId).populate('teamMembers');
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve project' });
    }
};

// Update project details
exports.updateProject = async (req, res) => {
    const { name, description, teamMembers, tasks, startDate, endDate } = req.body;
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.projectId,
            { name, description, teamMembers, tasks, startDate, endDate },
            { new: true }
        );
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project updated successfully', project });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update project' });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project' });
    }
};

// Add a team member to a project
exports.addTeamMember = async (req, res) => {
    const { userId } = req.body;
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        project.teamMembers.push(userId);
        await project.save();
        res.json({ message: 'Team member added successfully', project });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add team member' });
    }
};

// Add a task to a project
exports.addTask = async (req, res) => {
    const { title, description, assignedTo, dueDate } = req.body;
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        project.tasks.push({ title, description, assignedTo, dueDate });
        await project.save();
        res.json({ message: 'Task added successfully', project });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add task' });
    }
};
