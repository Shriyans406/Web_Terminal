import WebTerminal from './components/Terminal';

function App() {
  return (
    <div style={{ padding: '20px' }}>

      <h1 style={{ textAlign: 'center' }}>
        Linux Command Sandbox
      </h1>

      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ width: '900px' }}>
          <WebTerminal />
        </div>
      </div>

    </div>
  );
}

export default App;