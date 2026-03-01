const Issue = require('../models/Issue');

class EscalationService {
    /**
     * Run auto-escalation for unresolved issues exceeding SLA thresholds
     */
    async processEscalations() {
        console.log('--- RUNNING CIVIX AI ESCALATION SERVICE ---');

        // Find issues older than 48h (default SLA) that are still in 'reported' status
        const thresholdDate = new Date();
        thresholdDate.setHours(thresholdDate.getHours() - 48);

        const issuesToEscalate = await Issue.find({
            status: 'reported',
            createdAt: { $lt: thresholdDate }
        });

        console.log(`Analyzing ${issuesToEscalate.length} potential candidates...`);

        for (const issue of issuesToEscalate) {
            issue.status = 'escalated';
            issue.statusHistory.push({
                status: 'reported',
                reason: 'Auto-escalated by SLA Engine (Threshold: 48h)'
            });

            // Bonus: Bump priority by 15 points on escalation
            issue.priority = Math.min(issue.priority + 15, 100);

            await issue.save();
            console.log(`[ESCALATED] Issue ${issue._id} (Priority: ${issue.priority})`);
        }

        return { totalChecked: issuesToEscalate.length, escalated: issuesToEscalate.length };
    }
}

module.exports = new EscalationService();
