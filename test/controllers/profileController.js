// controllers/profileController.js
const BasicProfile = require('../models/basicProfileModel');
const DetailedProfile = require('../models/detailedProfileModel');

exports.getProfile = async (req, res) => {
    try {
        const profile = await BasicProfile.findOne({ userId: req.user.id });
        res.json(profile);
    } catch (err) {
        res.status(404).json({ message: 'Profile not found' });
    }
};
