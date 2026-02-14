const { getDb } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const processPayment = (req, res) => {
  const { amount, cardNumber, expiryDate, cvv } = req.body;

  if (!amount || !cardNumber || !expiryDate || !cvv) {
    return res.status(400).json({ message: 'All payment details are required' });
  }

  // Dummy payment processing
  const isSuccessful = Math.random() > 0.1; // 90% success rate

  if (isSuccessful) {
    res.json({
      success: true,
      message: 'Payment processed successfully',
      transactionId: uuidv4(),
      amount
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Payment failed. Please try again.'
    });
  }
};

module.exports = {
  processPayment
};
