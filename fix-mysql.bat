@echo off
echo ========================================
echo BitrSweet Coffee - MySQL Authentication Fix
echo ========================================
echo.

echo Step 1: Stopping MySQL in XAMPP...
echo Please stop MySQL in XAMPP Control Panel if it's running
echo Press any key when MySQL is stopped...
pause

echo.
echo Step 2: Starting MySQL in safe mode...
cd /d C:\xampp\mysql\bin
start "MySQL Safe Mode" cmd /k "mysqld --skip-grant-tables --skip-networking"

echo.
echo Step 3: Waiting for MySQL to start...
timeout /t 5 /nobreak > nul

echo.
echo Step 4: Connecting to MySQL and fixing authentication...
mysql -u root < "%~dp0backend\fix-mysql-auth.sql"

echo.
echo Step 5: Stopping safe mode MySQL...
echo Please close the MySQL Safe Mode window that opened
echo Press any key when you've closed the safe mode window...
pause

echo.
echo Step 6: Starting MySQL normally in XAMPP...
echo Please start MySQL in XAMPP Control Panel
echo Press any key when MySQL is running normally...
pause

echo.
echo Step 7: Testing connection...
mysql -u root -e "SELECT 'Connection successful!' as status;"

echo.
echo ========================================
echo Fix completed! Now try running: npm run backend
echo ========================================
pause


