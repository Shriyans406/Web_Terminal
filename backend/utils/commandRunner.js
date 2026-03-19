const { spawn } = require('child_process');
const path = require('path');

const runCommand = (command) => {
    return new Promise((resolve) => {
        const scriptPath = path.join(__dirname, '../../scripts/execute_command.sh');

        const process = spawn(scriptPath, [command]);

        let stdout = '';
        let stderr = '';

        process.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        process.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        process.on('close', () => {
            resolve({
                stdout,
                stderr
            });
        });
    });
};

module.exports = { runCommand };