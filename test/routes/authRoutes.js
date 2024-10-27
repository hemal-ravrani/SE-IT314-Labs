// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Register a new user (Admin-only route)
router.post('/register', authMiddleware, authController.registerUser);

// User login
router.post('/login', authController.loginUser);

// Fetch user profile (Authenticated users)
router.get('/profile', authMiddleware, authController.getUserProfile);

module.exports = router;
