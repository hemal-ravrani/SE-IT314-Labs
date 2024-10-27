// routes/leaveRoutes.js
const express = require('express');
const leaveController = require('../controllers/leaveController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Apply for leave (Employee)
router.post('/apply', authMiddleware, leaveController.applyLeave);

// View leave requests for a specific user (Employee)
router.get('/my-requests', authMiddleware, leaveController.getUserLeaveRequests);

// View all leave requests (Manager/Admin)
router.get('/', authMiddleware, roleMiddleware(['Manager', 'Admin']), leaveController.getAllLeaveRequests);

// Approve or reject leave (Manager/Admin)
router.put('/:leaveId/status', authMiddleware, roleMiddleware(['Manager', 'Admin']), leaveController.updateLeaveStatus);

module.exports = router;
