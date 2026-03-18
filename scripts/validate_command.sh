#!/bin/bash

COMMAND="$1"

# -----------------------------
# 🚨 BLOCK SPECIAL CHARACTERS
# -----------------------------

# Use grep for safer pattern matching
if echo "$COMMAND" | grep -qE ';|&&|\||`|\$\('; then
    echo "BLOCKED"
    exit 1
fi

# -----------------------------
# ✅ EXTRACT BASE COMMAND
# -----------------------------

BASE_CMD=$(echo "$COMMAND" | awk '{print $1}')

# -----------------------------
# ✅ ALLOWED COMMANDS
# -----------------------------

ALLOWED=("ls" "pwd" "whoami" "date" "echo" "uname")

for cmd in "${ALLOWED[@]}"; do
    if [ "$BASE_CMD" = "$cmd" ]; then
        echo "ALLOWED"
        exit 0
    fi
done

echo "BLOCKED"
exit 1