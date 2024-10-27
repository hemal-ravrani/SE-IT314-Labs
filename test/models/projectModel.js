// models/projectModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date }
});

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tasks: [taskSchema],
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Project', projectSchema);
