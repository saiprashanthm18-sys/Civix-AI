const natural = require('natural');

class NlpService {
    /**
     * Calculate similarity score between two descriptions
     * @param { string } s1 - string 1
     * @param { string } s2 - string 2
     * @param { number } threshold - threshold for match (0.0 - 1.0)
     */
    calculateSimilarity(s1, s2, threshold = 0.8) {
        if (!s1 || !s2) return 0;

        // Using Jaro-Winkler distance for short text similarity
        const score = natural.JaroWinklerDistance(s1.toLowerCase(), s2.toLowerCase());
        return score >= threshold;
    }
}

module.exports = new NlpService();
