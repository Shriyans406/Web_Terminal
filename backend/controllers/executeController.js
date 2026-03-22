const { runCommand } = require('../utils/commandRunner');
const { logCommand } = require('../utils/logger');
const {
    getSession,
    updateSession,
    updateDirectory
} = require('../utils/sessionManager');

const path = require('path');

const executeCommand = async (req, res) => {
    try {
        const { command, sessionId } = req.body;

        if (!command) {
            return res.status(400).json({ error: 'No command provided' });
        }

        // -----------------------------
        // GET SESSION
        // -----------------------------
        const session = getSession(sessionId);

        if (!session) {
            return res.status(400).json({ error: 'Invalid session' });
        }

        let currentDir = session.currentDir;

        console.log("CURRENT DIR:", currentDir);

        // -----------------------------
        // HANDLE CD COMMAND
        // -----------------------------
        // -----------------------------
        // HANDLE CD COMMAND (FIXED)
        // -----------------------------
        if (command.trim().startsWith('cd')) {
            const parts = command.trim().split(/\s+/);

            let target = parts[1];

            // If just "cd" → go to root sandbox
            if (!target || target === '~') {
                target = '/home/sandbox_env';
            }

            let newPath;

            if (target.startsWith('/')) {
                newPath = target;
            } else {
                newPath = path.resolve(currentDir, target);
            }

            // 🔥 DEBUG
            console.log("CD TARGET:", target);
            console.log("NEW PATH:", newPath);

            // SECURITY: restrict inside sandbox
            if (!newPath.startsWith('/home/sandbox_env')) {
                return res.json({
                    stdout: '',
                    stderr: 'Access Denied'
                });
            }

            // 🔥 CHECK IF DIRECTORY EXISTS


            // 🔥 UPDATE SESSION
            updateDirectory(sessionId, newPath);

            console.log("UPDATED DIR:", newPath);

            return res.json({
                stdout: '',
                stderr: ''
            });
        }

        // -----------------------------
        // RUN NORMAL COMMAND
        // -----------------------------
        const result = await runCommand(command, currentDir);

        // -----------------------------
        // UPDATE SESSION HISTORY
        // -----------------------------
        updateSession(sessionId, command);

        // -----------------------------
        // DETERMINE STATUS
        // -----------------------------
        let status = 'SUCCESS';

        if (result.stderr && result.stderr.trim() !== '') {
            status = 'ERROR';
        }

        if (result.stdout.includes('Error: Command not allowed')) {
            status = 'BLOCKED';
        }

        // -----------------------------
        // LOG COMMAND
        // -----------------------------
        logCommand({
            command,
            status,
            stdout: result.stdout,
            stderr: result.stderr
        });

        // -----------------------------
        // SEND RESPONSE
        // -----------------------------
        res.json({
            stdout: result.stdout,
            stderr: result.stderr
        });

    } catch (error) {
        res.status(500).json({ error: 'Execution failed' });
    }
};

module.exports = { executeCommand };