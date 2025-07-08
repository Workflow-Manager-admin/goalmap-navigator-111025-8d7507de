#!/bin/bash
cd /home/kavia/workspace/code-generation/goalmap-navigator-111025-8d7507de/frontend_react_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

