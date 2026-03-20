import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { executeCommand } from '../services/api';

const WebTerminal = () => {
    const terminalRef = useRef(null);
    const termRef = useRef(null);

    useEffect(() => {
        const term = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#000000',
                foreground: '#00ff00'
            }
        });

        term.open(terminalRef.current);
        termRef.current = term;

        let command = '';
        let history = [];
        let historyIndex = -1;

        const prompt = () => {
            term.write('\r\nuser@web:~$ ');
        };

        term.write('Welcome to Linux Web Terminal');
        prompt();

        term.onData(async (data) => {
            const char = data;

            // ENTER
            if (char === '\r') {
                term.write('\r\n');

                if (command.trim() !== '') {
                    history.push(command);
                    historyIndex = history.length;
                }

                const result = await executeCommand(command);

                if (result.stdout) {
                    term.write(result.stdout);
                }

                if (result.stderr) {
                    term.write('\r\n\x1b[31m' + result.stderr + '\x1b[0m');
                }

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

        return () => {
            term.dispose();
        };
    }, []);

    return (
        <div
            ref={terminalRef}
            style={{
                width: '100%',
                height: '500px',
                textAlign: 'left'
            }}
        />
    );
};

export default WebTerminal;