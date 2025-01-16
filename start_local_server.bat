@echo off
echo Starting the local server for Garcia.dicematrix.cloud...

:: Navigate to the directory using PowerShell to handle special characters
powershell -Command "cd -LiteralPath 'D:\[dev]\[websites]\garcia.dicematrix.cloud'; Start-Sleep -Seconds 1"

if %errorlevel% neq 0 (
    echo Error: Failed to navigate to the directory. Ensure the path is correct.
    pause
    exit /b
)

echo Running PM2 to start the server...
pm2 start node_modules/react-scripts/scripts/start.js --name local.garcia.dicematrix.cloud

if %errorlevel% neq 0 (
    echo Error: Failed to start the server using PM2.
    pause
    exit /b
)

echo Server started successfully. PM2 is now managing the process.
pause
