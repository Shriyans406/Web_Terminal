const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const executeRoute = require('./routes/execute');
const sessionRoute = require('./routes/session');

app.use('/api', executeRoute);
app.use('/api', sessionRoute);

app.get('/', (req, res) => {
    res.send('Backend is running');
});

const PORT = 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please kill the existing process.`);
    } else {
        console.error('Server error:', err);
    }
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});