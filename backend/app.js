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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});