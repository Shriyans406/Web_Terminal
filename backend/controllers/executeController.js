const { runCommand } = require('../utils/commandRunner');

const executeCommand = async (req, res) => {
    try {
        const { command } = req.body;

        if (!command) {
            return res.status(400).json({ error: 'No command provided' });
        }

        const output = await runCommand(command);

        res.json({ output });

    } catch (error) {
        res.status(500).json({ error: 'Execution failed' });
    }
};

module.exports = { executeCommand };