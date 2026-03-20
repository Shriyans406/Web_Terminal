#!/bin/bash

COMMAND="$1"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

VALIDATION=$("$SCRIPT_DIR/validate_command.sh" "$COMMAND")

if [ "$VALIDATION" != "ALLOWED" ]; then
    echo "Error: Command not allowed"
    exit 1
fi

# -----------------------------
# 🔐 SANDBOX EXECUTION
# -----------------------------

OUTPUT=$(sudo -u sandboxuser bash -c "cd /home/sandbox_env && $COMMAND" 2>&1)

echo "$OUTPUT"