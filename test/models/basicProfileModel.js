// models/basicProfileModel.js
const mongoose = require('mongoose');

const basicProfileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    photo: { type: String },  // URL or path to profile photo
    name: { type: String, required: true, trim: true },
    jobRole: { type: String, required: true, trim: true },
    employeeId: { type: String, unique: true, required: true }
});

module.exports = mongoose.model('BasicProfile', basicProfileSchema);
