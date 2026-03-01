class PriorityEngine {
    /**
     * Calculate priority score for an issue
     * @param { object } issue - the issue object
     * @returns { number } score - 0 to 100
     */
    calculateScore(issue) {
        let score = 0;

        // 1. Base Severity based on category
        const categoryScores = {
            'pothole': 20,
            'water_leak': 40,
            'power_outage': 60,
            'waste_management': 15,
            'street_light': 10,
            'other': 5,
        };
        score += categoryScores[issue.category] || 0;

        // 2. Proximity to high-sensitivity locations (Dummy logic for now)
        // In a real system, we'd query $near for hospitals/schools
        if (issue.location && issue.location.isSensitiveArea) {
            score += 30; // 30 bonus points for sensitive zones
        }

        // 3. Impact count (re-reports)
        // +5 points for each additional re-report, up to 30 points
        score += Math.min(issue.impactCount * 5, 30);

        // 4. Time since submission (Escalation factor)
        const hoursElapsed = (Date.now() - new Date(issue.createdAt).getTime()) / (1000 * 60 * 60);
        // +2 point for every 4 hours passed
        score += Math.floor(hoursElapsed / 4) * 2;

        return Math.min(score, 100); // capped at 100
    }
}

module.exports = new PriorityEngine();
