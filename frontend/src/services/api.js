export const executeCommand = async (command) => {
    const response = await fetch('http://localhost:5000/api/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command })
    });

    const data = await response.json();
    return data;
};