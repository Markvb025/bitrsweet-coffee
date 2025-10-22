const express = require('express');
const cors = require('cors');
const config = require('./config');

// Conditionally import database based on environment
let database;
if (config.database.type === 'sqlite') {
  database = require('./database-sqlite');
} else {
  database = require('./database');
}

const { promisePool, testConnection, initializeDatabase, insertSampleData } = database;

const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Get all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM menu_items ORDER BY category, name');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// Get menu items by category
app.get('/api/menu/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const [rows] = await promisePool.execute(
      'SELECT * FROM menu_items WHERE category = ? ORDER BY name',
      [category]
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching menu items by category:', error);
    res.status(500).json({ error: 'Failed to fetch menu items by category' });
  }
});

// Get single menu item
app.get('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await promisePool.execute(
      'SELECT * FROM menu_items WHERE id = ?',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ error: 'Failed to fetch menu item' });
  }
});

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const { customer_name, customer_email, customer_phone, items, total_amount } = req.body;
    
    // Start transaction
    const connection = await promisePool.getConnection();
    await connection.beginTransaction();
    
    try {
      // Insert order
      const [orderResult] = await connection.execute(
        'INSERT INTO orders (customer_name, customer_email, customer_phone, total_amount) VALUES (?, ?, ?, ?)',
        [customer_name, customer_email, customer_phone, total_amount]
      );
      
      const orderId = orderResult.insertId;
      
      // Insert order items
      for (const item of items) {
        await connection.execute(
          'INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.menu_item_id, item.quantity, item.price]
        );
      }
      
      // Commit transaction
      await connection.commit();
      connection.release();
      
      res.json({ 
        success: true, 
        order_id: orderId, 
        message: 'Order created successfully' 
      });
    } catch (error) {
      // Rollback transaction
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    // For SQLite compatibility, we'll fetch orders and items separately
    if (config.database.type === 'sqlite') {
      const [orders] = await promisePool.execute(`
        SELECT * FROM orders 
        ORDER BY created_at DESC
      `);
      
      // Get items for each order
      for (let order of orders) {
        const [items] = await promisePool.execute(`
          SELECT oi.*, mi.name, mi.image_url
          FROM order_items oi
          JOIN menu_items mi ON oi.menu_item_id = mi.id
          WHERE oi.order_id = ?
        `, [order.id]);
        
        order.items = items.map(item => `${item.name} (${item.quantity}x)`).join(', ');
      }
      
      res.json(orders);
    } else {
      // MySQL version with GROUP_CONCAT
      const [rows] = await promisePool.execute(`
        SELECT o.*, 
               GROUP_CONCAT(
                 CONCAT(mi.name, ' (', oi.quantity, 'x)') 
                 SEPARATOR ', '
               ) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `);
      res.json(rows);
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get single order with items
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get order details
    const [orderRows] = await promisePool.execute(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    );
    
    if (orderRows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Get order items
    const [itemRows] = await promisePool.execute(`
      SELECT oi.*, mi.name, mi.image_url
      FROM order_items oi
      JOIN menu_items mi ON oi.menu_item_id = mi.id
      WHERE oi.order_id = ?
    `, [id]);
    
    res.json({
      order: orderRows[0],
      items: itemRows
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    await promisePool.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );
    
    res.json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'BitrSweet Coffee API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Initialize database tables
    await initializeDatabase();
    
    // Insert sample data
    await insertSampleData();
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
      console.log(`🗄️  Using ${config.database.type.toUpperCase()} database`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

