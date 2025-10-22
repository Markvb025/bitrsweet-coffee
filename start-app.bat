@echo off
echo Starting BitrSweet Coffee Shop Application...
echo.

echo Starting Backend Server (SQLite)...
start "Backend Server" cmd /k "cd /d "%~dp0backend" && node server.js"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend...
start "Frontend" cmd /k "cd /d "%~dp0" && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul
