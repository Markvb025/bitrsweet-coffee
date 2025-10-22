# BitrSweet Coffee Shop - Database Setup Guide

This guide will help you connect your React coffee shop website to a MySQL database using XAMPP's phpMyAdmin.

## Prerequisites

1. **XAMPP** installed and running
2. **Node.js** installed on your system
3. **MySQL** service running in XAMPP

## Step 1: Start XAMPP Services

1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Make sure both services are running (green status)

## Step 2: Create Database in phpMyAdmin

1. Open your web browser and go to `http://localhost/phpmyadmin`
2. Click on "New" in the left sidebar
3. Create a new database named `bitrsweet_coffee`
4. Click "Create"

## Step 3: Import Database Schema

### Option A: Using the SQL file (Recommended)
1. In phpMyAdmin, select the `bitrsweet_coffee` database
2. Click on the "Import" tab
3. Click "Choose File" and select `backend/setup-database.sql`
4. Click "Go" to import the schema and sample data

### Option B: Manual setup
1. In phpMyAdmin, select the `bitrsweet_coffee` database
2. Go to the "SQL" tab
3. Copy and paste the contents of `backend/setup-database.sql`
4. Click "Go" to execute the SQL

## Step 4: Install Backend Dependencies

1. Open a terminal/command prompt
2. Navigate to the backend directory:
   ```bash
   cd bitrsweet-coffee/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Step 5: Configure Database Connection

1. Open `backend/config.js`
2. Update the database configuration if needed:
   ```javascript
   database: {
     host: 'localhost',
     user: 'root',
     password: '', // Add your XAMPP MySQL password here if you have one
     database: 'bitrsweet_coffee'
   }
   ```

## Step 6: Start the Backend Server

1. In the backend directory, run:
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

2. You should see:
   ```
   ✅ Connected to MySQL database successfully!
   ✅ Database tables initialized successfully!
   ✅ Sample menu items inserted successfully!
   🚀 Server running on http://localhost:5000
   ```

## Step 7: Start the React Frontend

1. Open a new terminal/command prompt
2. Navigate to the main project directory:
   ```bash
   cd bitrsweet-coffee
   ```
3. Install frontend dependencies (if not already done):
   ```bash
   npm install
   ```
4. Start the React development server:
   ```bash
   npm start
   ```

## Step 8: Test the Connection

1. Open your browser and go to `http://localhost:3000`
2. Navigate to the Menu page
3. You should see the menu items loaded from the database
4. If you see a loading spinner or error message, check that:
   - XAMPP MySQL is running
   - Backend server is running on port 5000
   - Database `bitrsweet_coffee` exists and has data

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/menu` - Get all menu items
- `GET /api/menu/category/:category` - Get menu items by category
- `GET /api/menu/:id` - Get single menu item
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/health` - Health check

## Troubleshooting

### Common Issues:

1. **"Failed to load menu items" error:**
   - Check if XAMPP MySQL is running
   - Verify the backend server is running on port 5000
   - Check database connection settings in `config.js`

2. **"Database connection failed" error:**
   - Ensure XAMPP MySQL is running
   - Check if the database `bitrsweet_coffee` exists
   - Verify username/password in `config.js`

3. **Port 5000 already in use:**
   - Change the port in `backend/config.js`
   - Update the API_BASE_URL in `src/services/api.js`

4. **CORS errors:**
   - The backend already includes CORS middleware
   - If issues persist, check browser console for specific errors

## Database Schema

The database includes three main tables:

1. **menu_items** - Stores coffee shop menu items
2. **orders** - Stores customer orders
3. **order_items** - Stores individual items within orders

## Next Steps

- Add more menu items through phpMyAdmin
- Implement order functionality in the Cart page
- Add user authentication
- Create an admin panel for managing orders

## Support

If you encounter any issues, check:
1. XAMPP Control Panel for service status
2. Backend server console for error messages
3. Browser developer tools for network errors
4. phpMyAdmin to verify database and table structure

