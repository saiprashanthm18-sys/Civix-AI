const fs = require('fs');
const path = require('path');
const Issue = require('../models/Issue');
const GeoService = require('../services/geoService');
const NlpService = require('../services/nlpService');
const PriorityEngine = require('../services/priorityEngine');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Submit a new issue or merge with existing
 */
exports.submitIssue = async (req, res, next) => {
    try {
        const { title, description, category, latitude, longitude, address } = req.body;
        let imageFilename = req.file ? req.file.filename : null;

        const coordinates = [parseFloat(longitude), parseFloat(latitude)];

        // 1. Check for nearby issues (radius 100m)
        const nearbyIssues = await GeoService.findNearbyIssues(coordinates, 100, category);

        // 2. Filter for description similarity (threshold 0.75)
        let masterIssue = null;
        for (const ni of nearbyIssues) {
            if (NlpService.calculateSimilarity(description, ni.description, 0.75)) {
                masterIssue = ni;
                break;
            }
        }

        if (masterIssue) {
            // DUPLICATE DETECTED -> MERGE -> Increment Impact Count
            masterIssue.impactCount += 1;

            // Re-calculate priority for the master issue
            masterIssue.priority = PriorityEngine.calculateScore(masterIssue);

            // Update masters timestamp/last seen
            masterIssue.updatedAt = Date.now();

            await masterIssue.save();

            return res.status(200).json({
                success: true,
                message: 'A similar issue was already reported. Your report has been merged to increase priority.',
                isMerged: true,
                issue: masterIssue,
            });
        }

        // 3. CREATE NEW ISSUE if no duplicate
        const newIssue = await Issue.create({
            title,
            description,
            category,
            location: {
                type: 'Point',
                coordinates: coordinates,
                address: address || '',
            },
            image: imageFilename,
            reporter: req.user.id, // Auth middleware will provide this
            impactCount: 1,
        });

        // Calculate initial priority
        newIssue.priority = PriorityEngine.calculateScore(newIssue);
        await newIssue.save();

        res.status(201).json({
            success: true,
            message: 'New issue reported successfully.',
            isMerged: false,
            issue: newIssue,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * Get all issues with filters
 */
exports.getIssues = async (req, res, next) => {
    try {
        const { category, status, sortByPriority } = req.query;
        const query = { isMerged: false }; // Only master issues

        if (category) query.category = category;
        if (status) query.status = status;

        let issues = Issue.find(query)
            .populate('reporter', 'name email')
            .populate('assignedTo', 'name email role');

        if (sortByPriority === 'true') {
            issues = issues.sort({ priority: -1, createdAt: -1 });
        } else {
            issues = issues.sort({ createdAt: -1 });
        }

        const results = await issues;

        res.status(200).json({
            success: true,
            count: results.length,
            data: results,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

/**
 * Update issue status and history
 */
exports.updateStatus = async (req, res, next) => {
    try {
        const { status, reason } = req.body;
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({ success: false, message: 'Issue not found' });
        }

        // Role check (Admin/Worker only)
        if (req.user.role === 'citizen') {
            return res.status(403).json({ success: false, message: 'Citizens cannot change status' });
        }

        issue.statusHistory.push({
            status: issue.status,
            reason: reason || 'Status updated by official',
        });

        issue.status = status;
        issue.updatedAt = Date.now();

        await issue.save();

        res.status(200).json({
            success: true,
            data: issue,
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
