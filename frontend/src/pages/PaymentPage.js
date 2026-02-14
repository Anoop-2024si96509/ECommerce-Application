import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { orderService, paymentService } from '../services/api';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Process payment
      const paymentResponse = await paymentService.processPayment({
        amount: getCartTotal(),
        cardNumber: paymentData.cardNumber,
        expiryDate: paymentData.expiryDate,
        cvv: paymentData.cvv
      });

      if (paymentResponse.data.success) {
        // Create order
        const orderItems = cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }));

        await orderService.createOrder(orderItems);
        setSuccess(true);
        clearCart();
        setTimeout(() => {
          navigate('/orders');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container">
        <p>No items in cart</p>
        <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="container payment-page">
      <h1>Payment</h1>

      <div className="payment-content">
        <div className="payment-form">
          <h2>Payment Details</h2>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">Payment successful! Redirecting to orders...</div>}
          
          {!success && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={paymentData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={handleChange}
                  maxLength="19"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={handleChange}
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-pay">
                {loading ? 'Processing...' : `Pay $${getCartTotal().toFixed(2)}`}
              </button>
            </form>
          )}
        </div>

        <div className="payment-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
