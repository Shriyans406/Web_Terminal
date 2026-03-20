const { runCommand } = require('../utils/commandRunner');
const { logCommand } = require('../utils/logger');

const executeCommand = async (req, res) => {
    try {
        const { command } = req.body;

        if (!command) {
            return res.status(400).json({ error: 'No command provided' });
        }

        const result = await runCommand(command);

        // Determine status
        let status = 'SUCCESS';

        if (result.stderr && result.stderr.trim() !== '') {
            status = 'ERROR';
        }

        if (result.stdout.includes('Error: Command not allowed')) {
            status = 'BLOCKED';
        }

        // Log the command
        logCommand({
            command,
            status,
            stdout: result.stdout,
            stderr: result.stderr
        });

        res.json({
            stdout: result.stdout,
            stderr: result.stderr
        });

    } catch (error) {
        res.status(500).json({ error: 'Execution failed' });
    }
};

module.exports = { executeCommand };