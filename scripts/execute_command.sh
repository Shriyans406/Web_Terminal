#!/bin/bash

COMMAND="$1"
WORKDIR="$2"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Validate command
VALIDATION=$("$SCRIPT_DIR/validate_command.sh" "$COMMAND")

if [ "$VALIDATION" != "ALLOWED" ]; then
    echo "Error: Command not allowed"
    exit 1
fi

# Default directory
if [ -z "$WORKDIR" ]; then
    WORKDIR="/home/sandbox_env"
fi

# If directory doesn't exist → fallback
if [ ! -d "$WORKDIR" ]; then
    WORKDIR="/home/sandbox_env"
fi

# 🔥 DEBUG (IMPORTANT for now)
echo "DEBUG DIR: $WORKDIR" >&2

# Execute command inside sandbox user
OUTPUT=$(sudo -u sandboxuser bash -c "cd \"$WORKDIR\" ; $COMMAND" 2>&1)
#OUTPUT=$(sudo -u sandboxuser bash -c "cd \"$WORKDIR\" ; pwd; $COMMAND" 2>&1)
echo "DEBUG DIR BEFORE EXEC: $WORKDIR" >&2
echo "$OUTPUT"