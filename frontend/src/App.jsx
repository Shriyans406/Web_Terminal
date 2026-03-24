import WebTerminal from './components/Terminal';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Linux Command Sandbox</h1>
        <p>A high-performance terminal environment in your browser.</p>
      </header>

      <main className="terminal-wrapper">
        <div className="terminal-inner">
          <div className="terminal-header">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
            <span className="terminal-title">bash — web-terminal</span>
          </div>
          <WebTerminal />
        </div>
      </main>
    </div>
  );
}

export default App;