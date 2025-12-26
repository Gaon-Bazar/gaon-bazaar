import React from 'react';
import { useCart } from '../context/CartContext';
import './CartModal.css';

function CartModal({ open, onClose, onCheckout }) {
  const { cart, removeFromCart } = useCart();

  if (!open) return null;

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>🛒 Your Cart</h3>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">Your cart is empty</div>
        ) : (
          <div className="cart-body">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <div className="item-name">{item.name}</div>
                    <div className="item-meta">{item.quantity} kg · ₹{item.price}/kg</div>
                  </div>
                  <div className="item-actions">
                    <div className="item-price">₹{(item.price || 0) * (item.quantity || 1)}</div>
                    <button className="link-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Total</span>
                <span className="summary-total">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="cart-footer">
          <button className="ghost-btn" onClick={onClose}>Continue Shopping</button>
          <button className="solid-btn" disabled={cart.length === 0} onClick={onCheckout}>
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;
