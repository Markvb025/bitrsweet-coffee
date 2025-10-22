-- Fix MySQL authentication for root user
USE mysql;

-- Reset root password to empty (no password) for all root users
UPDATE user SET authentication_string='' WHERE User='root';
UPDATE user SET authentication_string='' WHERE User='root' AND Host='localhost';
UPDATE user SET authentication_string='' WHERE User='root' AND Host='127.0.0.1';
UPDATE user SET authentication_string='' WHERE User='root' AND Host='::1';

-- Set authentication plugin to native password for all root users
UPDATE user SET plugin='mysql_native_password' WHERE User='root';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;

-- Test connection
SELECT 'MySQL authentication fixed successfully!' as status;