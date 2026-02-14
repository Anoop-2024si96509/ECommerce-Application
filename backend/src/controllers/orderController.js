const { getDb } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const createOrder = (req, res) => {
  const { items } = req.body;
  const userId = req.user.userId;
  const db = getDb();

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const orderId = uuidv4();
  let totalAmount = 0;
  let processedItems = 0;

  // Calculate total and validate stock
  const checkStock = () => {
    items.forEach(item => {
      db.get('SELECT price, stock FROM products WHERE id = ?', [item.productId], (err, product) => {
        if (err || !product) {
          return res.status(404).json({ message: 'Product not found' });
        }

        if (product.stock < item.quantity) {
          return res.status(400).json({ message: 'Insufficient stock' });
        }

        totalAmount += product.price * item.quantity;
        processedItems++;

        if (processedItems === items.length) {
          insertOrder();
        }
      });
    });
  };

  const insertOrder = () => {
    db.run(
      'INSERT INTO orders (id, userId, totalAmount, status, paymentStatus) VALUES (?, ?, ?, ?, ?)',
      [orderId, userId, totalAmount, 'pending', 'pending'],
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating order' });
        }

        // Insert order items
        let insertedItems = 0;
        items.forEach(item => {
          db.get('SELECT price FROM products WHERE id = ?', [item.productId], (err, product) => {
            if (!err && product) {
              db.run(
                'INSERT INTO orderItems (id, orderId, productId, quantity, price) VALUES (?, ?, ?, ?, ?)',
                [uuidv4(), orderId, item.productId, item.quantity, product.price],
                () => {
                  insertedItems++;
                  if (insertedItems === items.length) {
                    res.status(201).json({
                      message: 'Order created successfully',
                      orderId,
                      totalAmount
                    });
                  }
                }
              );
            }
          });
        });
      }
    );
  };

  checkStock();
};

const getUserOrders = (req, res) => {
  const userId = req.user.userId;
  const db = getDb();

  db.all(
    `SELECT o.*, 
            GROUP_CONCAT(json_object('productId', oi.productId, 'quantity', oi.quantity, 'price', oi.price)) as items
     FROM orders o
     LEFT JOIN orderItems oi ON o.id = oi.orderId
     WHERE o.userId = ?
     GROUP BY o.id
     ORDER BY o.createdAt DESC`,
    [userId],
    (err, orders) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching orders' });
      }

      const formattedOrders = orders.map(order => ({
        ...order,
        items: order.items ? JSON.parse('[' + order.items + ']') : []
      }));

      res.json(formattedOrders);
    }
  );
};

const getOrderById = (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.userId;
  const db = getDb();

  db.get('SELECT * FROM orders WHERE id = ? AND userId = ?', [orderId, userId], (err, order) => {
    if (err || !order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    db.all('SELECT * FROM orderItems WHERE orderId = ?', [orderId], (err, items) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching order items' });
      }

      res.json({ ...order, items });
    });
  });
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById
};
