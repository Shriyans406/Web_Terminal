const { exec } = require('child_process');
const path = require('path');

const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.join(__dirname, '../../scripts/execute_command.sh');

        exec(`${scriptPath} "${command}"`, (error, stdout, stderr) => {
            if (error) {
                return resolve(stderr || error.message);
            }
            resolve(stdout);
        });
    });
};

module.exports = { runCommand };