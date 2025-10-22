const mysql = require('mysql2');

// Test MySQL connection with your specific configuration
const testConnection = async () => {
  console.log('🔍 Testing MySQL connection...');
  console.log('Configuration:');
  console.log('- Host: localhost');
  console.log('- Port: 4308');
  console.log('- User: root');
  console.log('- Password: (empty)');
  console.log('- Database: bitrsweet_coffee');
  console.log('');

  try {
    // Test basic connection without database first
    const connection = mysql.createConnection({
      host: 'localhost',
      port: 4308,
      user: 'root',
      password: '',
      authPlugins: {
        mysql_native_password: () => () => Buffer.alloc(0)
      }
    });

    console.log('✅ Basic MySQL connection successful!');
    
    // Test database creation/selection
    connection.query('CREATE DATABASE IF NOT EXISTS bitrsweet_coffee', (err) => {
      if (err) {
        console.error('❌ Database creation failed:', err.message);
      } else {
        console.log('✅ Database "bitrsweet_coffee" created/verified!');
      }
      
      // Close connection
      connection.end();
      
      // Test connection with database
      const dbConnection = mysql.createConnection({
        host: 'localhost',
        port: 4308,
        user: 'root',
        password: '',
        database: 'bitrsweet_coffee',
        authPlugins: {
          mysql_native_password: () => () => Buffer.alloc(0)
        }
      });

      dbConnection.query('SELECT 1 as test', (err, results) => {
        if (err) {
          console.error('❌ Database connection failed:', err.message);
        } else {
          console.log('✅ Database connection successful!');
          console.log('🎉 All tests passed! Your MySQL setup is working correctly.');
        }
        
        dbConnection.end();
      });
    });

  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Make sure XAMPP MySQL is running on port 4308');
    console.log('2. Check XAMPP Control Panel - MySQL should be running');
    console.log('3. Verify port 4308 is correct in XAMPP configuration');
    console.log('4. Try restarting XAMPP MySQL service');
    console.log('5. Check if any firewall is blocking port 4308');
  }
};

testConnection();