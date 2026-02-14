const { getDb } = require('../config/database');

const getAllProducts = (req, res) => {
  const { search, category } = req.query;
  const db = getDb();

  let query = 'SELECT * FROM products WHERE 1=1';
  const params = [];

  if (search) {
    query += ' AND (name LIKE ? OR description LIKE ?)';
    const searchTerm = `%${search}%`;
    params.push(searchTerm, searchTerm);
  }

  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }

  db.all(query, params, (err, products) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching products' });
    }
    res.json(products);
  });
};

const getProductById = (req, res) => {
  const { id } = req.params;
  const db = getDb();

  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching product' });
    }
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });
};

const getCategories = (req, res) => {
  const db = getDb();

  db.all('SELECT DISTINCT category FROM products', (err, categories) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching categories' });
    }
    res.json(categories.map(c => c.category));
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  getCategories
};
