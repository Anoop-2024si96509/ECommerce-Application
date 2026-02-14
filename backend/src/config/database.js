const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, '../../data/ecommerce.db');

let db = null;

const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        reject(err);
      } else {
        createTables().then(resolve).catch(reject);
      }
    });
  });
};

const createTables = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          firstname TEXT NOT NULL,
          lastname TEXT NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Products table
      db.run(`
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          price REAL NOT NULL,
          image TEXT,
          category TEXT,
          stock INTEGER DEFAULT 0,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Orders table
      db.run(`
        CREATE TABLE IF NOT EXISTS orders (
          id TEXT PRIMARY KEY,
          userId TEXT NOT NULL,
          totalAmount REAL NOT NULL,
          status TEXT DEFAULT 'pending',
          paymentStatus TEXT DEFAULT 'pending',
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(userId) REFERENCES users(id)
        )
      `);

      // Order items table
      db.run(`
        CREATE TABLE IF NOT EXISTS orderItems (
          id TEXT PRIMARY KEY,
          orderId TEXT NOT NULL,
          productId TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          price REAL NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(orderId) REFERENCES orders(id),
          FOREIGN KEY(productId) REFERENCES products(id)
        )
      `, (err) => {
        if (err) reject(err);
        else {
          seedProducts();
          resolve();
        }
      });
    });
  });
};

const seedProducts = () => {
  const products = [
    { id: '1', name: 'Laptop', description: 'High-performance laptop with 16GB RAM, 512GB SSD, and 15.6" Full HD display. Perfect for work and entertainment.', price: 999.99, category: 'Electronics', stock: 10, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop' },
    { id: '2', name: 'Smartphone', description: 'Latest smartphone with 6.5" AMOLED display, 128GB storage, 48MP camera, and all-day battery life.', price: 699.99, category: 'Electronics', stock: 15, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop' },
    { id: '3', name: 'Headphones', description: 'Premium wireless noise-cancelling headphones with 30-hour battery life and Hi-Res Audio support.', price: 199.99, category: 'Electronics', stock: 20, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
    { id: '4', name: 'Tablet', description: 'Portable 10.9" tablet with M1 chip, 256GB storage, and Apple Pencil support for creative professionals.', price: 449.99, category: 'Electronics', stock: 12, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop' },
    { id: '5', name: 'Smart Watch', description: 'Feature-rich smartwatch with heart rate monitor, GPS, sleep tracking, and 7-day battery life.', price: 299.99, category: 'Electronics', stock: 18, image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop' },
    { id: '6', name: 'USB-C Cable', description: 'Premium braided USB-C to USB-C fast charging cable, 6ft length, supports 100W Power Delivery.', price: 19.99, category: 'Accessories', stock: 50, image: 'https://images.unsplash.com/photo-1572721546624-05bf65ad7679?w=400&h=300&fit=crop' },
    { id: '7', name: 'Screen Protector', description: '9H hardness tempered glass screen protector with anti-fingerprint coating and easy bubble-free installation.', price: 12.99, category: 'Accessories', stock: 40, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop' },
    { id: '8', name: 'Phone Case', description: 'Military-grade drop protection phone case with slim profile, raised edges, and wireless charging compatibility.', price: 24.99, category: 'Accessories', stock: 35, image: 'https://images.unsplash.com/photo-1541877944-ac82a091518a?w=400&h=300&fit=crop' }
  ];

  db.all('SELECT COUNT(*) as count FROM products', (err, rows) => {
    if (err) return;
    if (rows[0].count === 0) {
      products.forEach(product => {
        db.run(
          'INSERT INTO products (id, name, description, price, category, stock, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [product.id, product.name, product.description, product.price, product.category, product.stock, product.image]
        );
      });
    }
  });
};

const getDb = () => db;

module.exports = {
  initDatabase,
  getDb
};
