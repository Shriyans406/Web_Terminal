#!/bin/bash

COMMAND="$1"

# Extract first word (base command)
BASE_CMD=$(echo "$COMMAND" | awk '{print $1}')

# Allowed commands
ALLOWED=("ls" "pwd" "whoami" "date" "echo" "uname")

for cmd in "${ALLOWED[@]}"; do
    if [ "$BASE_CMD" = "$cmd" ]; then
        echo "ALLOWED"
        exit 0
    fi
done

echo "BLOCKED"
exit 1