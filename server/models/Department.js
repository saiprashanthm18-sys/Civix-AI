const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a department name'],
        unique: true,
    },
    description: {
        type: String,
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Admin or higher-level worker
    },
    staff: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    categories: [
        {
            type: String, // Categories this department handles (e.g., 'pothole', 'street_light')
        },
    ],
    slaThresholdHours: {
        type: Number,
        default: 48, // Default 48 hours before escalation
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Department', departmentSchema);
