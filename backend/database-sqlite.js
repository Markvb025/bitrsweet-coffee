const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create SQLite database
const dbPath = path.join(__dirname, 'bitrsweet_coffee.db');
const db = new sqlite3.Database(dbPath);

// Test database connection
const testConnection = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT 'Connected to SQLite database successfully!' as message", (err, row) => {
      if (err) {
        console.error('❌ Database connection failed:', err.message);
        reject(err);
      } else {
        console.log('✅', row.message);
        resolve();
      }
    });
  });
};

// Initialize database tables
const initializeDatabase = async () => {
  return new Promise((resolve, reject) => {
    const createTables = `
      CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL,
        image_url TEXT,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        customer_email TEXT,
        customer_phone TEXT,
        total_amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        menu_item_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
      );
    `;

    db.exec(createTables, (err) => {
      if (err) {
        console.error('❌ Database initialization failed:', err.message);
        reject(err);
      } else {
        console.log('✅ Database tables initialized successfully!');
        resolve();
      }
    });
  });
};

// Insert sample menu items
const insertSampleData = async () => {
  return new Promise((resolve, reject) => {
    // Check if menu items already exist
    db.get("SELECT COUNT(*) as count FROM menu_items", (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      if (row.count === 0) {
        const sampleItems = [
          ['Espresso', 120.00, 'Coffee', 'https://blogstudio.s3.theshoppad.net/coffeeheroau/ec178d83e5f597b162cda1e60cb64194.jpg', 'Rich and bold espresso shot'],
          ['Cappuccino', 150.00, 'Coffee', 'https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg', 'Perfectly balanced espresso with steamed milk and foam'],
          ['Latte', 160.00, 'Coffee', 'https://nucleuscoffee.com/cdn/shop/articles/Latte-recipe.jpg', 'Smooth espresso with steamed milk'],
          ['Iced Mocha', 170.00, 'Cold Brew', 'https://bakingmischief.com/wp-content/uploads/2019/05/iced-mocha-image-square.jpg', 'Refreshing iced coffee with chocolate'],
          ['Caramel Frappe', 190.00, 'Cold Brew', 'https://simplyhomecooked.com/wp-content/uploads/2025/07/caramel-frappuccino-recipe-2.jpg', 'Blended ice coffee with caramel flavor'],
          ['Croissant', 110.00, 'Pastry', 'https://sarahsvegankitchen.com/wp-content/uploads/2024/05/Vegan-Croissants-1.jpg', 'Buttery and flaky French pastry'],
          ['Chocolate Cake', 180.00, 'Pastry', 'https://www.allrecipes.com/thmb/zb8muWE6CQ5XjclY_LQ2i-QwxN0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/17981-one-bowl-chocolate-cake-iii-DDMFS-beauty-4x3-d2e182087e4b42a3a281a0a355ea60d1.jpg', 'Rich and moist chocolate cake']
        ];

        const stmt = db.prepare("INSERT INTO menu_items (name, price, category, image_url, description) VALUES (?, ?, ?, ?, ?)");
        
        sampleItems.forEach(item => {
          stmt.run(item);
        });
        
        stmt.finalize((err) => {
          if (err) {
            console.error('❌ Sample data insertion failed:', err.message);
            reject(err);
          } else {
            console.log('✅ Sample menu items inserted successfully!');
            resolve();
          }
        });
      } else {
        console.log('ℹ️ Menu items already exist, skipping sample data insertion');
        resolve();
      }
    });
  });
};

// Promise-based database methods
const promiseDb = {
  execute: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      if (params.length === 0) {
        db.all(sql, (err, rows) => {
          if (err) reject(err);
          else resolve([rows]);
        });
      } else {
        db.all(sql, params, (err, rows) => {
          if (err) reject(err);
          else resolve([rows]);
        });
      }
    });
  },
  
  getConnection: () => {
    return {
      execute: promiseDb.execute,
      beginTransaction: () => Promise.resolve(),
      commit: () => Promise.resolve(),
      rollback: () => Promise.resolve(),
      release: () => Promise.resolve()
    };
  }
};

module.exports = {
  promisePool: promiseDb,
  testConnection,
  initializeDatabase,
  insertSampleData
};
