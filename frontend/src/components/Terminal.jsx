import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import { executeCommand } from '../services/api';

const WebTerminal = () => {
    const terminalRef = useRef(null);
    const term = useRef(null);

    let command = '';

    useEffect(() => {
        term.current = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#000000',
                foreground: '#00ff00'
            }
        });

        term.current.open(terminalRef.current);

        const prompt = () => {
            term.current.write('\r\nuser@web:~$ ');
        };

        term.current.write('Welcome to Linux Web Terminal');
        prompt();

        term.current.onData(async (data) => {
            const char = data;

            // ENTER
            if (char === '\r') {
                term.current.write('\r\n');

                const output = await executeCommand(command);

                term.current.write(output);

                command = '';
                prompt();
            }

            // BACKSPACE
            else if (char === '\u007F') {
                if (command.length > 0) {
                    command = command.slice(0, -1);
                    term.current.write('\b \b');
                }
            }

            // NORMAL CHAR
            else {
                command += char;
                term.current.write(char);
            }
        });

        return () => {
            term.current.dispose();
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