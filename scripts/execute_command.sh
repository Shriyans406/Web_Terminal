#!/bin/bash

COMMAND=$1

# Execute command and capture output
OUTPUT=$(eval "$COMMAND" 2>&1)

echo "$OUTPUT"