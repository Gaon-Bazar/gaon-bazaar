import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';
import './Buyer.css';

function Buyer() {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderMessage, setOrderMessage] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // UI State Management
  const [activeTab, setActiveTab] = useState('marketplace'); // marketplace, analytics, orders
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

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

  const handleAddToCart = (listing) => {
    addToCart({
      id: listing.id ?? listing.crop,
      name: listing.crop,
      price: listing.min_price ?? listing.price ?? 0,
      quantity: 1,
      meta: { location: listing.location }
    });
    setOrderMessage(`Added ${listing.crop} to cart.`);
    setTimeout(() => setOrderMessage(''), 4000);
  };

  // Calculate summary metrics from existing data
  const calculateMetrics = () => {
    const totalOrders = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalProducts = listings.length;
    const avgPrice = listings.length > 0 
      ? (listings.reduce((sum, item) => sum + ((item.min_price + item.max_price) / 2), 0) / listings.length).toFixed(0)
      : 0;
    const verifiedCount = listings.filter(item => item.quality_verified).length;
    
    return { totalOrders, totalProducts, avgPrice, verifiedCount };
  };

  // Filter listings based on search and filters
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.crop.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.crop.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || listing.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Get unique categories and locations for dropdowns
  const categories = ['all', ...new Set(listings.map(l => l.crop))];
  const locations = ['all', ...new Set(listings.map(l => l.location))];

  const metrics = calculateMetrics();

  return (
    <div className="buyer-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="dashboard-title">Buyer Dashboard</h1>
            <p className="dashboard-subtitle">Discover fresh produce and buy directly from farmers</p>
          </div>
          <button className="btn-cart" onClick={() => setIsCartOpen(true)}>
            <span className="cart-icon">🛒</span>
            <span>View Cart ({cart.length})</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div className="metrics-container">
        <div className="metric-card">
          <div className="metric-icon orders-icon">📦</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.totalOrders || '0'}</div>
            <div className="metric-label">Total Orders</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon money-icon">💰</div>
          <div className="metric-content">
            <div className="metric-value">₹{metrics.avgPrice}</div>
            <div className="metric-label">Avg Price/kg</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon farmers-icon">👨‍🌾</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.verifiedCount}</div>
            <div className="metric-label">Verified Farmers</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon savings-icon">📊</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.totalProducts}</div>
            <div className="metric-label">Products Available</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'marketplace' ? 'active' : ''}`}
          onClick={() => setActiveTab('marketplace')}
        >
          <span className="tab-icon">🛍️</span>
          Marketplace
        </button>
        <button 
          className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <span className="tab-icon">📈</span>
          Market Analytics
        </button>
        <button 
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <span className="tab-icon">📋</span>
          My Orders
        </button>
      </div>

      {/* Order Confirmation Message */}
      {orderMessage && (
        <div className="success-notification">
          {orderMessage}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-notification">
          ⚠️ {error}
        </div>
      )}

      {/* Marketplace Tab Content */}
      {activeTab === 'marketplace' && (
        <div className="marketplace-section">
          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="search-input-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select 
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>

            <select 
              className="filter-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              {locations.slice(1).map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>

            <button onClick={fetchListings} disabled={loading} className="btn-refresh-modern">
              <span>🔄</span>
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading fresh produce...</p>
            </div>
          )}

          {/* Product Grid */}
          {!loading && filteredListings.length > 0 ? (
            <div className="product-grid">
              {filteredListings.map((listing, index) => (
                <div key={index} className="product-card">
                  {/* Product Image Placeholder */}
                  <div className="product-image">
                    <div className="product-image-placeholder">
                      <span className="product-emoji">🌾</span>
                    </div>
                    {listing.quality_verified && (
                      <span className="verified-badge">✓ Verified</span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="product-info">
                    <h3 className="product-name">{listing.crop}</h3>
                    
                    <div className="product-meta">
                      <div className="meta-item">
                        <span className="meta-icon">📍</span>
                        <span className="meta-text">{listing.location}</span>
                      </div>
                      <div className="rating">
                        <span className="stars">⭐⭐⭐⭐⭐</span>
                        <span className="rating-count">(4.8)</span>
                      </div>
                    </div>

                    <div className="product-details">
                      <div className="detail-row">
                        <span className="detail-label">Available:</span>
                        <span className="detail-value">{listing.quantity} kg</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Price Range:</span>
                        <span className="detail-value price-range">
                          ₹{listing.min_price} - ₹{listing.max_price}
                        </span>
                      </div>
                    </div>

                    {/* Quality Badge */}
                    <div className="quality-tag">
                      {listing.quality_verified ? (
                        <span className="organic-badge">🌿 Organic Certified</span>
                      ) : (
                        <span className="standard-badge">Standard Quality</span>
                      )}
                    </div>
                  </div>

                  {/* Product Actions */}
                  <div className="product-actions">
                    <button
                      onClick={() => handleAddToCart(listing)}
                      className="btn-add-cart"
                    >
                      <span>🛒</span>
                      Add to Cart
                    </button>
                    <button className="btn-view-details">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : !loading && filteredListings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🌾</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or check back soon for fresh produce!</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Analytics Tab (Placeholder) */}
      {activeTab === 'analytics' && (
        <div className="analytics-section">
          <div className="placeholder-content">
            <div className="placeholder-icon">📈</div>
            <h3>Market Analytics</h3>
            <p>Price trends and market insights coming soon...</p>
          </div>
        </div>
      )}

      {/* Orders Tab (Placeholder) */}
      {activeTab === 'orders' && (
        <div className="orders-section">
          <div className="placeholder-content">
            <div className="placeholder-icon">📋</div>
            <h3>My Orders</h3>
            <p>Your order history will appear here.</p>
            {orderMessage && (
              <div className="recent-order">
                <p>{orderMessage}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <CartModal
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          navigate('/billing');
        }}
      />
    </div>
  );
}

export default Buyer;
