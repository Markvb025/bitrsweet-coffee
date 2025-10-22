# BitrSweet Coffee - MySQL Authentication Fix (PowerShell)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "BitrSweet Coffee - MySQL Authentication Fix" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Checking XAMPP MySQL status..." -ForegroundColor Yellow
$mysqlProcess = Get-Process -Name "mysqld" -ErrorAction SilentlyContinue
if ($mysqlProcess) {
    Write-Host "MySQL is running. Please stop it in XAMPP Control Panel first." -ForegroundColor Red
    Read-Host "Press Enter when MySQL is stopped"
} else {
    Write-Host "MySQL is not running. Good!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 2: Starting MySQL in safe mode..." -ForegroundColor Yellow
Set-Location "C:\xampp\mysql\bin"
Start-Process -FilePath "mysqld" -ArgumentList "--skip-grant-tables", "--skip-networking", "--default-auth=mysql_native_password" -WindowStyle Normal

Write-Host "Waiting for MySQL to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "Step 3: Fixing authentication..." -ForegroundColor Yellow
$sqlCommands = @"
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
ALTER USER 'root'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY '';
ALTER USER 'root'@'::1' IDENTIFIED WITH mysql_native_password BY '';
FLUSH PRIVILEGES;
CREATE DATABASE IF NOT EXISTS bitrsweet_coffee;
SELECT 'Authentication fixed!' as status;
"@

$sqlCommands | & "C:\xampp\mysql\bin\mysql.exe" -u root --default-auth=mysql_native_password

Write-Host ""
Write-Host "Step 4: Stopping safe mode MySQL..." -ForegroundColor Yellow
$mysqlProcess = Get-Process -Name "mysqld" -ErrorAction SilentlyContinue
if ($mysqlProcess) {
    Stop-Process -Name "mysqld" -Force
    Write-Host "Safe mode MySQL stopped." -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 5: Please start MySQL normally in XAMPP Control Panel" -ForegroundColor Yellow
Read-Host "Press Enter when MySQL is running normally in XAMPP"

Write-Host ""
Write-Host "Step 6: Testing connection..." -ForegroundColor Yellow
& "C:\xampp\mysql\bin\mysql.exe" -u root -e "SELECT 'Connection successful!' as status;"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Fix completed! Now try running: npm run backend" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Read-Host "Press Enter to exit"


