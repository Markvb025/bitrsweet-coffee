const mysql = require('mysql2');
const config = require('./config');

// Create connection pool with basic configuration
const pool = mysql.createPool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  waitForConnections: config.database.waitForConnections,
  connectionLimit: config.database.connectionLimit,
  queueLimit: config.database.queueLimit,
  authPlugins: config.database.authPlugins
});

// Get a promise-based connection
const promisePool = pool.promise();

// Test database connection with fallback methods
const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log('✅ Connected to MySQL database successfully!');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    // Try alternative connection methods
    console.log('🔄 Trying alternative connection methods...');
    
    try {
      // Try without database first
      const testPool = mysql.createPool({
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        waitForConnections: true,
        connectionLimit: 1,
        queueLimit: 0,
        authPlugins: config.database.authPlugins
      });
      
      const testConnection = await testPool.promise().getConnection();
      console.log('✅ Basic MySQL connection successful!');
      testConnection.release();
      testPool.end();
      
      // Try to create database if it doesn't exist
      const createDbPool = mysql.createPool({
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        waitForConnections: true,
        connectionLimit: 1,
        queueLimit: 0,
        authPlugins: config.database.authPlugins
      });
      
      await createDbPool.promise().execute(`CREATE DATABASE IF NOT EXISTS ${config.database.database}`);
      console.log(`✅ Database '${config.database.database}' created/verified!`);
      createDbPool.end();
      
    } catch (altError) {
      console.error('❌ Alternative connection methods also failed:', altError.message);
      console.log('\n🔧 Troubleshooting steps:');
      console.log('1. Make sure XAMPP MySQL is running on port 4308');
      console.log('2. Check if MySQL is using the correct authentication plugin');
      console.log('3. Try restarting XAMPP MySQL service');
      console.log('4. Verify the database exists in phpMyAdmin');
      console.log('5. Ensure XAMPP MySQL is configured to use port 4308');
    }
  }
};

// Initialize database tables
const initializeDatabase = async () => {
  try {
    // Create menu_items table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        image_url TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create orders table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255),
        customer_phone VARCHAR(20),
        total_amount DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create order_items table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        menu_item_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Database tables initialized successfully!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
  }
};

// Insert sample menu items
const insertSampleData = async () => {
  try {
    // Check if menu items already exist
    const [rows] = await promisePool.execute('SELECT COUNT(*) as count FROM menu_items');
    
    if (rows[0].count === 0) {
      const sampleItems = [
        {
          name: 'Espresso',
          price: 120.00,
          category: 'Coffee',
          image_url: 'https://blogstudio.s3.theshoppad.net/coffeeheroau/ec178d83e5f597b162cda1e60cb64194.jpg',
          description: 'Rich and bold espresso shot'
        },
        {
          name: 'Cappuccino',
          price: 150.00,
          category: 'Coffee',
          image_url: 'https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg',
          description: 'Perfectly balanced espresso with steamed milk and foam'
        },
        {
          name: 'Latte',
          price: 160.00,
          category: 'Coffee',
          image_url: 'https://nucleuscoffee.com/cdn/shop/articles/Latte-recipe.jpg',
          description: 'Smooth espresso with steamed milk'
        },
        {
          name: 'Iced Mocha',
          price: 170.00,
          category: 'Cold Brew',
          image_url: 'https://bakingmischief.com/wp-content/uploads/2019/05/iced-mocha-image-square.jpg',
          description: 'Refreshing iced coffee with chocolate'
        },
        {
          name: 'Caramel Frappe',
          price: 190.00,
          category: 'Cold Brew',
          image_url: 'https://simplyhomecooked.com/wp-content/uploads/2025/07/caramel-frappuccino-recipe-2.jpg',
          description: 'Blended ice coffee with caramel flavor'
        },
        {
          name: 'Croissant',
          price: 110.00,
          category: 'Pastry',
          image_url: 'https://sarahsvegankitchen.com/wp-content/uploads/2024/05/Vegan-Croissants-1.jpg',
          description: 'Buttery and flaky French pastry'
        },
        {
          name: 'Chocolate Cake',
          price: 180.00,
          category: 'Pastry',
          image_url: 'https://www.allrecipes.com/thmb/zb8muWE6CQ5XjclY_LQ2i-QwxN0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/17981-one-bowl-chocolate-cake-iii-DDMFS-beauty-4x3-d2e182087e4b42a3a281a0a355ea60d1.jpg',
          description: 'Rich and moist chocolate cake'
        }
      ];

      for (const item of sampleItems) {
        await promisePool.execute(
          'INSERT INTO menu_items (name, price, category, image_url, description) VALUES (?, ?, ?, ?, ?)',
          [item.name, item.price, item.category, item.image_url, item.description]
        );
      }

      console.log('✅ Sample menu items inserted successfully!');
    } else {
      console.log('ℹ️ Menu items already exist, skipping sample data insertion');
    }
  } catch (error) {
    console.error('❌ Sample data insertion failed:', error.message);
  }
};

module.exports = {
  promisePool,
  testConnection,
  initializeDatabase,
  insertSampleData
};
