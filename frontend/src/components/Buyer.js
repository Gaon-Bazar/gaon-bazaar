import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../api';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';
import './Buyer.css';

function Buyer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderMessage, setOrderMessage] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quantityInputs, setQuantityInputs] = useState({}); // per-listing desired kg
  const [quantityErrors, setQuantityErrors] = useState({}); // per-listing error text
  
  // UI State Management
  const [activeTab, setActiveTab] = useState('marketplace'); // marketplace, analytics, orders
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  const handleAddToCart = (listing, idx) => {
    const desiredRaw = quantityInputs[idx] ?? 1;
    let desired = parseInt(desiredRaw, 10);
    if (isNaN(desired) || desired <= 0) desired = 1;
    const available = parseInt(listing.quantity ?? 1, 10);
    if (desired > available) {
      setQuantityErrors((prev) => ({
        ...prev,
        [idx]: `${t('buyer.error_not_enough')} ${available} kg`,
      }));
      return;
    }
    const finalQty = Math.min(Math.max(desired, 1), available);

    addToCart({
      id: listing.id ?? `${listing.crop}-${idx}`,
      name: listing.crop,
      price: listing.min_price ?? listing.price ?? 0,
      quantity: finalQty,
      meta: { location: listing.location }
    });
    setOrderMessage(`${t('buyer.added_to_cart')} ${finalQty} kg ${listing.crop}`);
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
            <h1 className="dashboard-title">{t('buyer.title')}</h1>
            <p className="dashboard-subtitle">{t('buyer.subtitle')}</p>
          </div>
          <button className="btn-cart" onClick={() => setIsCartOpen(true)}>
            <span className="cart-icon">🛒</span>
            <span>{t('buyer.btn_view_cart')} ({cart.length})</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div className="metrics-container">
        <div className="metric-card">
          <div className="metric-icon orders-icon">📦</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.totalOrders || '0'}</div>
            <div className="metric-label">{t('buyer.metric_total_orders')}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon money-icon">💰</div>
          <div className="metric-content">
            <div className="metric-value">₹{metrics.avgPrice}</div>
            <div className="metric-label">{t('buyer.metric_avg_price')}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon farmers-icon">👨‍🌾</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.verifiedCount}</div>
            <div className="metric-label">{t('buyer.metric_verified_farmers')}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon savings-icon">📊</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.totalProducts}</div>
            <div className="metric-label">{t('buyer.metric_products')}</div>
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
          {t('buyer.tab_marketplace')}
        </button>
        <button 
          className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <span className="tab-icon">📈</span>
          {t('buyer.tab_analytics')}
        </button>
        <button 
          className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <span className="tab-icon">📋</span>
          {t('buyer.tab_orders')}
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
                placeholder={t('buyer.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select 
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">{t('buyer.filter_all_categories')}</option>
              {categories.slice(1).map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>

            <select 
              className="filter-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="all">{t('buyer.filter_all_locations')}</option>
              {locations.slice(1).map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>

            <button onClick={fetchListings} disabled={loading} className="btn-refresh-modern">
              <span>🔄</span>
              {loading ? t('common.loading') : t('buyer.btn_refresh')}
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>{t('buyer.loading_produce')}</p>
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
                      <span className="verified-badge">✓ {t('buyer.verified')}</span>
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
                        <span className="detail-label">{t('buyer.available')}:</span>
                        <span className="detail-value">{listing.quantity} kg</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">{t('buyer.price_range')}:</span>
                        <span className="detail-value price-range">
                          ₹{listing.min_price} - ₹{listing.max_price}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">{t('buyer.buy_kg')}:</span>
                        <span className="detail-value">
                          <input
                            type="number"
                            min={1}
                            max={listing.quantity}
                            value={quantityInputs[index] ?? 1}
                            onChange={(e) => {
                              const val = e.target.value;
                              setQuantityInputs((prev) => ({ ...prev, [index]: val }));
                              const num = parseInt(val, 10);
                              if (isNaN(num) || num < 1) {
                                setQuantityErrors((prev) => ({ ...prev, [index]: 'Enter at least 1 kg' }));
                              } else if (num > (listing.quantity ?? 0)) {
                                setQuantityErrors((prev) => ({ ...prev, [index]: `Not enough quantity. Available: ${listing.quantity} kg` }));
                              } else {
                                setQuantityErrors((prev) => {
                                  const { [index]: _, ...rest } = prev;
                                  return rest;
                                });
                              }
                            }}
                            className="qty-input"
                          />
                        </span>
                      </div>
                      {quantityErrors[index] && (
                        <div className="error-notification" style={{ marginTop: '6px' }}>
                          ⚠️ {quantityErrors[index]}
                        </div>
                      )}
                    </div>

                    {/* Quality Badge */}
                    <div className="quality-tag">
                      {listing.quality_verified ? (
                        <span className="organic-badge">🌿 {t('buyer.organic_certified')}</span>
                      ) : (
                        <span className="standard-badge">{t('buyer.standard_quality')}</span>
                      )}
                    </div>
                  </div>

                  {/* Product Actions */}
                  <div className="product-actions">
                    <button
                      onClick={() => handleAddToCart(listing, index)}
                      className="btn-add-cart"
                      disabled={Boolean(quantityErrors[index])}
                    >
                      <span>🛒</span>
                      {t('buyer.btn_add_cart')}
                    </button>
                    <button className="btn-view-details">
                      {t('buyer.btn_view_details')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : !loading && filteredListings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🌾</div>
              <h3>{t('buyer.empty_title')}</h3>
              <p>{t('buyer.empty_subtitle')}</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Analytics Tab (Placeholder) */}
      {activeTab === 'analytics' && (
        <div className="analytics-section">
          <div className="placeholder-content">
            <div className="placeholder-icon">📈</div>
            <h3>{t('buyer.analytics_title')}</h3>
            <p>{t('buyer.analytics_subtitle')}</p>
          </div>
        </div>
      )}

      {/* Orders Tab (Placeholder) */}
      {activeTab === 'orders' && (
        <div className="orders-section">
          <div className="placeholder-content">
            <div className="placeholder-icon">📋</div>
            <h3>{t('buyer.orders_title')}</h3>
            <p>{t('buyer.orders_subtitle')}</p>
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
