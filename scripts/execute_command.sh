#!/bin/bash

COMMAND="$1"

# Get script directory safely
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Run validation script
VALIDATION=$("$SCRIPT_DIR/validate_command.sh" "$COMMAND")

# Debug (optional - you can remove later)
# echo "Validation: $VALIDATION"

if [ "$VALIDATION" != "ALLOWED" ]; then
    echo "Error: Command not allowed"
    exit 1
fi

# Execute command
OUTPUT=$(eval "$COMMAND" 2>&1)

echo "$OUTPUT"