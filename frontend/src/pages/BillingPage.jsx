import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './BillingPage.css';

function BillingPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/');
    }
  }, [cart.length, navigate]);

  const handlePlaceOrder = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div className="billing-page">
      <div className="billing-card">
        <h2>Order Confirmed ✅</h2>
        <p className="muted">Thanks for your purchase. Your order will be delivered soon.</p>

        <div className="billing-section">
          <div className="section-title">Items</div>
          {cart.map((item) => (
            <div key={item.id} className="billing-row">
              <span>{item.name} · {item.quantity} kg</span>
              <span>₹{(item.price || 0) * (item.quantity || 1)}</span>
            </div>
          ))}
          <div className="billing-row total">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="billing-section">
          <div className="section-title">Delivery</div>
          <div className="billing-row">
            <span>Standard Delivery</span>
            <span>2-3 days</span>
          </div>
        </div>

        <button className="solid-btn" onClick={handlePlaceOrder}>Back to Market</button>
      </div>
    </div>
  );
}

export default BillingPage;
