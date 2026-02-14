import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getUserOrders();
      setOrders(response.data);
    } catch (err) {
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container"><p>Loading orders...</p></div>;
  }

  return (
    <div className="container orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-container">
          <div className="orders-list">
            {orders.map(order => (
              <div 
                key={order.id} 
                className={`order-item ${selectedOrder?.id === order.id ? 'active' : ''}`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="order-header">
                  <h3>Order #{order.id.substring(0, 8)}</h3>
                  <span className={`status ${order.paymentStatus}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="order-total">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {selectedOrder && (
            <div className="order-details">
              <h2>Order Details</h2>
              <div className="detail-section">
                <h3>Order Information</h3>
                <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                <p><strong>Status:</strong> <span className={`status ${selectedOrder.paymentStatus}`}>{selectedOrder.paymentStatus}</span></p>
              </div>

              <div className="detail-section">
                <h3>Items</h3>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  <div className="items-list">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="item-row">
                        <span>Product ID: {item.productId}</span>
                        <span>Qty: {item.quantity}</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No items in this order</p>
                )}
              </div>

              <div className="detail-section">
                <h3>Order Summary</h3>
                <div className="summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="summary-total">
                    <span>Total:</span>
                    <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
