const sessions = {};

const createSession = () => {
    const sessionId = Math.random().toString(36).substring(2, 10);

    sessions[sessionId] = {
        history: [],
        currentDir: '/home/sandbox_env'
    };

    return sessionId;
};

const getSession = (sessionId) => sessions[sessionId];

const updateSession = (sessionId, command) => {
    if (sessions[sessionId]) {
        sessions[sessionId].history.push(command);
    }
};

const updateDirectory = (sessionId, dir) => {
    if (sessions[sessionId]) {
        sessions[sessionId].currentDir = dir;
    }
};

module.exports = {
    createSession,
    getSession,
    updateSession,
    updateDirectory
};