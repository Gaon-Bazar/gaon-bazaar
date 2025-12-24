import React, { useState, useEffect } from 'react';
import api from '../api';
import './Buyer.css';

function Buyer() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderMessage, setOrderMessage] = useState('');

  // base handled by api instance

  // Fetch listings on component mount
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/buyer/listings`);
      setListings(response.data);
    } catch (err) {
      setError('Failed to load listings. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOrder = async (crop, quantity) => {
    try {
      const response = await api.post(
        `/buyer/order`,
        null,
        {
          params: {
            crop: crop,
            quantity: quantity
          }
        }
      );

      setOrderMessage(`✅ Order #${response.data.order_id} confirmed for ${quantity}kg of ${crop}!`);
      setTimeout(() => setOrderMessage(''), 5000);
    } catch (err) {
      setError('Failed to confirm order. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="buyer-container">
      <div className="buyer-section">
        <h2>🛒 Farmer Listings</h2>
        <p className="section-subtitle">Browse fresh produce from trusted farmers</p>

        {/* Refresh Button */}
        <button onClick={fetchListings} disabled={loading} className="btn-refresh">
          🔄 Refresh Listings
        </button>

        {/* Order Confirmation Message */}
        {orderMessage && (
          <div className="success-message">
            {orderMessage}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading">
            Loading listings...
          </div>
        )}

        {/* Listings Grid */}
        {listings && listings.length > 0 ? (
          <div className="listings-grid">
            {listings.map((listing, index) => (
              <div key={index} className="listing-card card">
                <div className="card-header">
                  <h3 className="crop-name">🌾 {listing.crop}</h3>
                  {listing.quality_verified && (
                    <span className="badge badge-success">✓ Verified</span>
                  )}
                </div>

                <div className="card-body">
                  {/* Quantity */}
                  <div className="listing-item">
                    <span className="listing-label">📦 Quantity:</span>
                    <span className="listing-value">{listing.quantity} kg</span>
                  </div>

                  {/* Location */}
                  <div className="listing-item">
                    <span className="listing-label">📍 Location:</span>
                    <span className="listing-value">{listing.location}</span>
                  </div>

                  {/* Price Range */}
                  <div className="price-section">
                    <span className="listing-label">💰 Fair Price Range:</span>
                    <div className="price-display">
                      <span className="price-min">₹{listing.min_price}</span>
                      <span className="price-separator">-</span>
                      <span className="price-max">₹{listing.max_price}</span>
                    </div>
                  </div>

                  {/* Quality Info */}
                  <div className="quality-info">
                    <span className="quality-badge">
                      {listing.quality_verified ? '🌿 Quality Verified' : '⚠️ Standard'}
                    </span>
                  </div>
                </div>

                {/* Order Button */}
                <div className="card-footer">
                  <button
                    onClick={() => handleConfirmOrder(listing.crop, listing.quantity)}
                    className="btn-primary btn-order"
                  >
                    ✅ Confirm Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : !loading ? (
          <div className="no-listings">
            <p>🚜 No listings available yet.</p>
            <p>Farmers will add their produce soon!</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Buyer;
