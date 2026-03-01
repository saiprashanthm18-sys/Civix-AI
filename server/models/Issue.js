const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['pothole', 'water_leak', 'power_outage', 'waste_management', 'street_light', 'other'],
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true,
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
        address: String,
    },
    image: {
        type: String, // URL/Path to image
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Worker or Admin
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    },
    status: {
        type: String,
        enum: ['reported', 'in progress', 'escalated', 'resolved', 'closed'],
        default: 'reported',
    },
    priority: {
        type: Number,
        default: 0, // Calculated dynamically
    },
    impactCount: {
        type: Number,
        default: 1,
    },
    isMerged: {
        type: Boolean,
        default: false,
    },
    masterIssue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue', // Points to the master issue if this is a duplicate
    },
    statusHistory: [
        {
            status: String,
            updatedAt: { type: Date, default: Date.now },
            reason: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Index for geospatial queries
issueSchema.index({ location: '2dsphere' });

// Update the updatedAt field before saving
issueSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Issue', issueSchema);
