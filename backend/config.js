module.exports = {
  database: {
    // Use SQLite for production (Vercel) and MySQL for local development
    type: process.env.NODE_ENV === 'production' ? 'sqlite' : 'mysql',
    
    // MySQL configuration (for local development)
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
    
    // SQLite configuration (for production)
    sqlite: {
      filename: 'bitrsweet_coffee.db'
    }
  },
  port: process.env.PORT || 5000
};