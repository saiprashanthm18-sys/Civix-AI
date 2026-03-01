const Issue = require('../models/Issue');

class GeoService {
    /**
     * Find issues within a specified radius (in meters)
     * @param { [number, number] } coordinates - [longitude, latitude]
     * @param { number } radius - radius in meters
     * @param { string } category - optional category filter
     */
    async findNearbyIssues(coordinates, radius = 50, category = null) {
        const query = {
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: coordinates,
                    },
                    $maxDistance: radius,
                },
            },
            status: { $nin: ['resolved', 'closed'] }, // Don't merge with resolved/closed issues
            isMerged: false, // Only original issues
        };

        if (category) {
            query.category = category;
        }

        return await Issue.find(query);
    }
}

module.exports = new GeoService();
