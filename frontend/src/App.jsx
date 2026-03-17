import { useState } from 'react';
import { executeCommand } from './services/api';

function App() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const handleExecute = async () => {
    const result = await executeCommand(command);
    setOutput(result);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Linux Command Sandbox</h1>

      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter command"
        style={{ width: '300px', marginRight: '10px' }}
      />

      <button onClick={handleExecute}>Run</button>

      <pre style={{ marginTop: '20px', background: '#000', color: '#0f0', padding: '10px' }}>
        {output}
      </pre>
    </div>
  );
}

export default App;