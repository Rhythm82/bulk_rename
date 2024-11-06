@echo off
echo Starting the server...
start node server.js
timeout /t 3 /nobreak
start http://localhost:3000