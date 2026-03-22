const express = require('express');
const router = express.Router();
const { createSession } = require('../utils/sessionManager');

router.get('/session', (req, res) => {
    const sessionId = createSession();
    res.json({ sessionId, currentDir: '~' });
});

module.exports = router;