const fs = require('fs');
const path = require('path');

const logCommand = (logData) => {
    const logsDir = path.join(__dirname, '../../logs');

    // Ensure logs directory exists
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }

    // Create log file per day
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(logsDir, `${date}.log`);

    const logEntry = {
        timestamp: new Date().toISOString(),
        ...logData
    };

    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
};

module.exports = { logCommand };