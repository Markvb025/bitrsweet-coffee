-- BitrSweet Coffee Shop Database Setup
-- Run this script in phpMyAdmin to create the database

CREATE DATABASE IF NOT EXISTS bitrsweet_coffee;
USE bitrsweet_coffee;

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- Insert sample menu items
INSERT INTO menu_items (name, price, category, image_url, description) VALUES
('Espresso', 120.00, 'Coffee', 'https://blogstudio.s3.theshoppad.net/coffeeheroau/ec178d83e5f597b162cda1e60cb64194.jpg', 'Rich and bold espresso shot'),
('Cappuccino', 150.00, 'Coffee', 'https://www.allrecipes.com/thmb/chsZz0jqIHWYz39ViZR-9k_BkkE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8624835-how-to-make-a-cappuccino-beauty-4x3-0301-13d55eaad60b42058f24369c292d4ccb.jpg', 'Perfectly balanced espresso with steamed milk and foam'),
('Latte', 160.00, 'Coffee', 'https://nucleuscoffee.com/cdn/shop/articles/Latte-recipe.jpg', 'Smooth espresso with steamed milk'),
('Iced Mocha', 170.00, 'Cold Brew', 'https://bakingmischief.com/wp-content/uploads/2019/05/iced-mocha-image-square.jpg', 'Refreshing iced coffee with chocolate'),
('Caramel Frappe', 190.00, 'Cold Brew', 'https://simplyhomecooked.com/wp-content/uploads/2025/07/caramel-frappuccino-recipe-2.jpg', 'Blended ice coffee with caramel flavor'),
('Croissant', 110.00, 'Pastry', 'https://sarahsvegankitchen.com/wp-content/uploads/2024/05/Vegan-Croissants-1.jpg', 'Buttery and flaky French pastry'),
('Chocolate Cake', 180.00, 'Pastry', 'https://www.allrecipes.com/thmb/zb8muWE6CQ5XjclY_LQ2i-QwxN0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/17981-one-bowl-chocolate-cake-iii-DDMFS-beauty-4x3-d2e182087e4b42a3a281a0a355ea60d1.jpg', 'Rich and moist chocolate cake');

-- Show tables
SHOW TABLES;

-- Show sample data
SELECT * FROM menu_items;

