const sessions = {};

const createSession = () => {
    const sessionId = Math.random().toString(36).substring(2, 10);

    sessions[sessionId] = {
        history: [],
        currentDir: process.cwd()
    };

    return sessionId;
};

const getSession = (sessionId) => {
    return sessions[sessionId];
};

const updateSession = (sessionId, command) => {
    if (sessions[sessionId]) {
        sessions[sessionId].history.push(command);
    }
};

module.exports = {
    createSession,
    getSession,
    updateSession
};