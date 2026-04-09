# Linux Command Sandbox

A web-based terminal emulator that provides a safe and interactive environment for executing Linux commands. This project allows users to practice Linux command-line skills directly in their browser using a sandboxed backend.

## Overview

The Linux Command Sandbox consists of a React-based frontend and a Node.js/Express backend. Users can type commands into a terminal UI, which are then sent to the backend for execution. The backend ensures security by validating commands and executing them as a restricted user within a specific directory.

## Features

- Interactive Web Terminal: A responsive terminal interface powered by xterm.js.
- Session Management: Persistent terminal sessions that track current directories and command history.
- Command Validation: A security layer that blocks dangerous or unauthorized commands.
- Sandboxed Execution: Commands are executed within a dedicated sandbox environment using a restricted system user.
- Real-time Output: Direct feedback of command stdout and stderr in the terminal UI.

## Architecture

### Frontend
- Built with React and Vite for a fast and modern development experience.
- Uses xterm.js and the fit-addon for a realistic terminal feel.
- Communicates with the backend through a custom API service layer.

### Backend
- Powered by Express.js.
- Manages unique user sessions to isolate terminal states.
- Uses shell scripts to bridge the application logic with the Linux system.
- Logging system in place to track command execution details.

### Security and Execution
- Command Validation: The system checks every command against a whitelist of allowed commands (ls, pwd, whoami, date, echo, uname, touch, cat, mkdir, rm) and blocks special characters like shell pipes or redirects.
- Restricted User: Commands are executed via sudo as a dedicated 'sandboxuser' to prevent unauthorized access to the host system.
- Directory Isolation: Users are restricted to working within the /home/sandbox_env directory.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)
- Bash-compatible shell (for back-end command execution)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd linux-command-sandbox
   ```

2. Setup Backend:
   ```bash
   cd backend
   npm install
   node app.js
   ```
   The backend server will run on http://localhost:5000.

3. Setup Frontend:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   The frontend will be available at the URL provided by Vite (usually http://localhost:5173).

## Project Structure

- /backend: Express.js server and API logic.
- /frontend: React/Vite application and terminal components.
- /scripts: Shell scripts for command validation and execution.
- /config: Project configuration files.
- /logs: Command execution logs.

## License

This project is licensed under the ISC License.
