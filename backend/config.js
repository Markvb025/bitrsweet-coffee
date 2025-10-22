module.exports = {
  database: {
    host: 'localhost',
    port: 4308, // XAMPP MySQL port
    user: 'root',
    password: '', // No password for XAMPP default setup
    database: 'bitrsweet_coffee',
    // Basic connection options
    connectionLimit: 10,
    queueLimit: 0,
    waitForConnections: true,
    // Simple authentication configuration
    authPlugins: {
      mysql_native_password: () => () => Buffer.alloc(0)
    }
  },
  port: 5000
};