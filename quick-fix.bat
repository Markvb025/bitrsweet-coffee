@echo off
echo ========================================
echo Quick MySQL Authentication Fix
echo ========================================
echo.

echo Step 1: Testing different passwords...
node test-mysql-connection.js

echo.
echo Step 2: If no password worked, try this:
echo.
echo 1. Open http://localhost/phpmyadmin
echo 2. Click "User accounts" tab
echo 3. Find root@localhost and click the pencil icon
echo 4. Set password to empty (leave password field blank)
echo 5. Click "Go" to save
echo.
echo Step 3: After fixing password, run:
echo npm run backend
echo.
pause


