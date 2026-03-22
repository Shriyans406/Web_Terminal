let sessionId = null;

// CREATE SESSION (ONLY ONCE)
export const initSession = async () => {
    if (sessionId) return;   // ✅ IMPORTANT (prevents reset)

    const response = await fetch('http://localhost:5000/api/session');
    const data = await response.json();
    sessionId = data.sessionId;
};

// EXECUTE COMMAND
export const executeCommand = async (command) => {
    const response = await fetch('http://localhost:5000/api/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            command,
            sessionId   // ✅ MUST BE SENT
        })
    });

    return await response.json();
};