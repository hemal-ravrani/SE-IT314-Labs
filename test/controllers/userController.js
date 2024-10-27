// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils');

// Get user details by ID (for admins or the user themselves)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        res.json({ id: user._id, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user password
exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user role (admin-only)
exports.updateUserRole = async (req, res) => {
    const { role } = req.body;

    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.role = role;
        await user.save();
        res.json({ message: `User role updated to ${role}` });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user (admin-only)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
