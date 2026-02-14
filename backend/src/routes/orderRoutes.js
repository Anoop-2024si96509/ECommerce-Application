const express = require('express');
const { createOrder, getUserOrders, getOrderById } = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:orderId', getOrderById);

module.exports = router;
