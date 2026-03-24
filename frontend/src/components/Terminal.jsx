import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { executeCommand, initSession } from '../services/api';

const WebTerminal = () => {
    const terminalRef = useRef(null);

    //new 
    const initialized = useRef(false);

    useEffect(() => {

        if (initialized.current) return;
        initialized.current = true;
        const init = async () => {
            await initSession();

            const term = new Terminal({
                cursorBlink: true,
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                theme: {
                    background: 'transparent',
                    foreground: '#E6EDF3',
                    cursor: '#7C4DFF',
                    selection: 'rgba(124, 77, 255, 0.3)',
                    black: '#161B22',
                    red: '#FF5F56',
                    green: '#27C93F',
                    yellow: '#FFBD2E',
                    blue: '#00D4FF',
                    magenta: '#7C4DFF',
                    cyan: '#00D4FF',
                    white: '#E6EDF3'
                },
                allowTransparency: true,
                scrollback: 1000
            });

            const fitAddon = new FitAddon();
            term.loadAddon(fitAddon);

            term.open(terminalRef.current);
            fitAddon.fit();

            setTimeout(() => {
                fitAddon.fit();
            }, 0);

            window.addEventListener('resize', () => {
                fitAddon.fit();
            });

            let command = '';
            let history = [];
            let historyIndex = -1;
            let currentPath = '~';

            const prompt = () => {
                term.write(`\r\n\x1b[36m${currentPath}\x1b[0m \x1b[35m❯\x1b[0m `);
            };

            term.write('\x1b[1;35mWelcome to Linux Command Sandbox\x1b[0m\r\n\x1b[2mType your commands below to interact with the system.\x1b[0m');
            prompt();

            term.onData(async (data) => {
                //if (isProcessing) return;

                const char = data;

                // ENTER
                if (char === '\r') {
                    term.write('\r\n');

                    if (command.trim() !== '') {
                        history.push(command);
                        historyIndex = history.length;
                    }

                    //isProcessing = true;

                    // Loading indicator
                    //term.write('\x1b[33mProcessing...\x1b[0m\r\n');

                    const result = await executeCommand(command);

                    if (result.stdout) {
                        term.write(result.stdout);
                    }

                    if (result.stderr) {
                        term.write('\r\n\x1b[31m' + result.stderr + '\x1b[0m');
                    }

                    if (result.currentDir) {
                        currentPath = result.currentDir;
                    }

                    //isProcessing = false;
                    command = '';
                    prompt();
                }

                // BACKSPACE
                else if (char === '\u007F') {
                    if (command.length > 0) {
                        command = command.slice(0, -1);
                        term.write('\b \b');
                    }
                }

                // UP ARROW
                else if (char === '\x1b[A') {
                    if (history.length > 0 && historyIndex > 0) {
                        historyIndex--;

                        while (command.length > 0) {
                            term.write('\b \b');
                            command = command.slice(0, -1);
                        }

                        command = history[historyIndex];
                        term.write(command);
                    }
                }

                // DOWN ARROW
                else if (char === '\x1b[B') {
                    if (historyIndex < history.length - 1) {
                        historyIndex++;

                        while (command.length > 0) {
                            term.write('\b \b');
                            command = command.slice(0, -1);
                        }

                        command = history[historyIndex];
                        term.write(command);
                    } else {
                        while (command.length > 0) {
                            term.write('\b \b');
                            command = command.slice(0, -1);
                        }

                        historyIndex = history.length;
                        command = '';
                    }
                }

                // NORMAL CHAR
                else {
                    command += char;
                    term.write(char);
                }
            });
        };

        init();
    }, []);

    return (
        <div
            style={{
                width: '100%',
                height: '500px',
                padding: '10px',
                boxSizing: 'border-box'
            }}
        >
            <div
                ref={terminalRef}
                style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'left'
                }}
            />
        </div>
    );
};

export default WebTerminal;