// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Routes for user-related operations
router.get('/:userId', authMiddleware, roleMiddleware(['Admin', 'User']), userController.getUserById);
router.put('/update-password', authMiddleware, userController.updatePassword);
router.put('/update-role/:userId', authMiddleware, roleMiddleware(['Admin']), userController.updateUserRole);
router.delete('/:userId', authMiddleware, roleMiddleware(['Admin']), userController.deleteUser);

module.exports = router;
