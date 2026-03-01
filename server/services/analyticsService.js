const Issue = require('../models/Issue');

class AnalyticsService {
    /**
     * Identifies hotspots based on issue density
     * Returns a grid-based frequency map for visualization
     */
    async getRiskHeatmap() {
        // Current simple approach: find issues and cluster them by rounding coordinates
        const issues = await Issue.find({ status: { $ne: 'closed' } });

        const densityMap = issues.reduce((acc, issue) => {
            // Round to 3 decimal places (~110m precision)
            const lat = issue.location.coordinates[1].toFixed(3);
            const lng = issue.location.coordinates[0].toFixed(3);
            const key = `${lat},${lng}`;

            if (!acc[key]) {
                acc[key] = { lat: parseFloat(lat), lng: parseFloat(lng), count: 0, prioritySum: 0 };
            }
            acc[key].count += 1;
            acc[key].prioritySum += issue.priority;
            return acc;
        }, {});

        return Object.values(densityMap).map(item => ({
            ...item,
            riskScore: (item.count * 0.4) + (item.prioritySum / item.count * 0.6)
        }));
    }

    /**
     * Forecasts future issues based on historical temporal spikes
     */
    async getTemporalSpikes() {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const stats = await Issue.aggregate([
            { $match: { createdAt: { $gte: oneMonthAgo } } },
            {
                $group: {
                    _id: {
                        day: { $dayOfMonth: "$createdAt" },
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    count: { $sum: 1 },
                    avgPriority: { $avg: "$priority" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
        ]);

        return stats;
    }
}

module.exports = new AnalyticsService();
