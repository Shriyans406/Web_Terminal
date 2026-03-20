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
                fontFamily: 'monospace',
                theme: {
                    background: '#000000',   // pure black
                    foreground: '#00ff00',   // bright green
                    cursor: '#ffffff'
                },
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
            //let isProcessing = false;

            const prompt = () => {
                term.write('\r\n\x1b[32muser@web\x1b[0m:\x1b[34m~\x1b[0m$ ');
            };

            term.write('\x1b[33mWelcome to Linux Command Sandbox\x1b[0m');
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
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid #30363d',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                backgroundColor: '#0d1117'
            }}
        >
            <div
                ref={terminalRef}
                style={{
                    width: '100%',
                    height: '100%',
                    padding: '10px',
                    boxSizing: 'border-box',
                    textAlign: 'left'   // ✅ CRITICAL FIX
                }}
            />
        </div>
    );
};

export default WebTerminal;