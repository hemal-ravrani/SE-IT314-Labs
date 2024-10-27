// controllers/leaveController.js
const Leave = require('../models/leaveModel');
const User = require('../models/userModel');

// Apply for leave
exports.applyLeave = async (req, res) => {
    const { startDate, endDate, reason } = req.body;
    try {
        const leave = new Leave({
            user: req.user.id,
            startDate,
            endDate,
            reason,
            status: 'Pending',
            appliedAt: new Date()
        });
        await leave.save();
        res.status(201).json({ message: 'Leave applied successfully', leave });
    } catch (error) {
        res.status(500).json({ message: 'Failed to apply for leave' });
    }
};

// Get all leave requests for admin/manager view
exports.getAllLeaveRequests = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('user', 'name role');
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve leave requests' });
    }
};

// Get leave requests for a specific user
exports.getUserLeaveRequests = async (req, res) => {
    try {
        const leaves = await Leave.find({ user: req.user.id });
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve user leave requests' });
    }
};

// Approve or reject a leave request
exports.updateLeaveStatus = async (req, res) => {
    const { leaveId } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const leave = await Leave.findById(leaveId);
        if (!leave) return res.status(404).json({ message: 'Leave request not found' });

        leave.status = status;
        leave.reviewedBy = req.user.id;
        leave.reviewedAt = new Date();
        await leave.save();

        res.json({ message: `Leave ${status.toLowerCase()} successfully`, leave });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update leave status' });
    }
};
