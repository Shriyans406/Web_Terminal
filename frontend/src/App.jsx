import WebTerminal from './components/Terminal';

function App() {
  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#0d1117',
        color: '#fff',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'   // only center container, NOT text
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>
        Linux Command Sandbox
      </h1>

      <div
        style={{
          width: '100%',
          maxWidth: '1000px'
        }}
      >
        <WebTerminal />
      </div>
    </div>
  );
}

export default App;