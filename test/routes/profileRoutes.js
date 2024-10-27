// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const Profile = require('../models/profileModel');
const authenticateToken = require('../middlewares/authMiddleware');
const validateProfile = require('../middlewares/validateProfile');

// Get Profile
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.user.id });
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create/Update Profile
router.post('/', authenticateToken, validateProfile, async (req, res) => {
    try {
        const { name, role, information, backDetails } = req.body;
        const profileData = { userId: req.user.id, name, role, information, backDetails };

        let profile = await Profile.findOne({ userId: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate({ userId: req.user.id }, profileData, { new: true });
            res.json({ message: 'Profile updated successfully', profile });
        } else {
            profile = new Profile(profileData);
            await profile.save();
            res.json({ message: 'Profile created successfully', profile });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
