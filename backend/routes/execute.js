const express = require('express');
const router = express.Router();
const { executeCommand } = require('../controllers/executeController');

router.post('/execute', executeCommand);

module.exports = router;