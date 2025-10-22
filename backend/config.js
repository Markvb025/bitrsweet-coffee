module.exports = {
  database: {
    // Use SQLite for both local development and production (Vercel)
    // This ensures the app works without requiring MySQL/XAMPP
    type: 'sqlite',
    
    // MySQL configuration (kept for reference, not used)
    mysql: {
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
    
    // SQLite configuration (used for both local and production)
    sqlite: {
      filename: 'bitrsweet_coffee.db'
    }
  },
  port: process.env.PORT || 5000
};