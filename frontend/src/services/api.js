let sessionId = null;

// ✅ CREATE SESSION
export const initSession = async () => {
    const response = await fetch('http://localhost:5000/api/session');
    const data = await response.json();
    sessionId = data.sessionId;
};

// ✅ EXECUTE COMMAND
export const executeCommand = async (command) => {
    const response = await fetch('http://localhost:5000/api/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command, sessionId })
    });

    const data = await response.json();
    return data;
};