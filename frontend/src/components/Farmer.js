import React, { useState, useRef, useEffect } from 'react';
import api from '../api';
import './Farmer.css';

function Farmer() {
  const [voiceInput, setVoiceInput] = useState('');
  const [extractedCrop, setExtractedCrop] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [qualityData, setQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechStatus, setSpeechStatus] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef(null);
  
  // Dashboard state
  const [activeTab, setActiveTab] = useState('listings'); // listings | all | analytics | add
  const [listings, setListings] = useState([]);

  // base handled by api instance

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.language = 'hi-IN'; // Hindi-India
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechStatus('🎙️ Listening...');
      setError('');
    };

    recognition.onresult = (event) => {
      let transcript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      // Only update on final result
      if (event.results[event.results.length - 1].isFinal) {
        setVoiceInput(transcript.trim());
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setSpeechStatus('✅ Speech captured');
      setTimeout(() => setSpeechStatus(''), 2000);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setSpeechStatus('');
      if (event.error === 'network') {
        setError('Network error. Please check your connection.');
      } else if (event.error === 'no-speech') {
        setError('No speech detected. Please try again.');
      } else if (event.error === 'not-allowed') {
        setError('Microphone permission denied. Please enable it in browser settings.');
      } else {
        setError(`Speech recognition error: ${event.error}`);
      }
    };

    recognitionRef.current = recognition;
  }, []);

  // Handle microphone button click
  const handleMicClick = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
    }
  };
  const handleVoiceInput = async () => {
    if (!voiceInput.trim()) {
      setError('Please enter crop information');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Process voice input
      const voiceResponse = await api.post(`/voice-input`, {
        text: voiceInput
      });

      setExtractedCrop(voiceResponse.data);

      // Get price prediction
      const priceResponse = await api.post(`/predict-price`, {
        crop: voiceResponse.data.crop,
        month: new Date().getMonth() + 1
      });

      setPriceData(priceResponse.data);

      // Get quality verification
      const qualityResponse = await api.get(`/iot/quality`);
      setQualityData(qualityResponse.data);
    } catch (err) {
      setError('Failed to process input. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddListing = async () => {
    if (!extractedCrop) {
      setError('Please process voice input first');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await api.post(`/farmer/add-listing`, {
        crop: extractedCrop.crop,
        quantity: extractedCrop.quantity,
        location: 'Your Village'
      });

      alert(`Listing added successfully! Listing ID: ${response.data.id}`);
      
      // Add new listing to local state for dashboard display
      const newListing = {
        id: response.data.id,
        crop: extractedCrop.crop,
        quantity: extractedCrop.quantity,
        location: 'Your Village',
        price: priceData?.predicted_price || 0,
        quality: qualityData?.freshness || 85,
        status: 'Available',
        category: getCropCategory(extractedCrop.crop)
      };
      setListings([newListing, ...listings]);
      
      setVoiceInput('');
      setExtractedCrop(null);
      setPriceData(null);
      setQualityData(null);
      setActiveTab('listings');
    } catch (err) {
      setError('Failed to add listing. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to categorize crops
  const getCropCategory = (crop) => {
    const grains = ['wheat', 'rice', 'barley', 'corn'];
    const vegetables = ['tomato', 'potato', 'onion', 'carrot', 'cabbage', 'cauliflower', 'brinjal'];
    const fruits = ['apple', 'banana', 'mango', 'orange'];
    
    const cropLower = crop.toLowerCase();
    if (grains.some(g => cropLower.includes(g))) return 'Grains';
    if (vegetables.some(v => cropLower.includes(v))) return 'Vegetables';
    if (fruits.some(f => cropLower.includes(f))) return 'Fruits';
    return 'Other';
  };

  // Calculate dashboard metrics
  const metrics = {
    totalListings: listings.length,
    totalQuantity: listings.reduce((sum, l) => sum + (l.quantity || 0), 0),
    activeListings: listings.filter(l => l.status === 'Available').length,
    avgQuality: listings.length > 0 
      ? Math.round(listings.reduce((sum, l) => sum + (l.quality || 0), 0) / listings.length)
      : 0
  };

  return (
    <div className="farmer-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">🌾 Farmer Dashboard</h1>
          <p className="dashboard-subtitle">Manage your crops, prices, and marketplace listings</p>
        </div>
        <button 
          className="btn-add-crop"
          onClick={() => setActiveTab('add')}
        >
          + Add New Crop
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📦</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.totalListings}</div>
            <div className="metric-label">Total Listings</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">⚖️</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.totalQuantity}</div>
            <div className="metric-label">Total Quantity (kg)</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.activeListings}</div>
            <div className="metric-label">Active Listings</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">⭐</div>
          <div className="metric-content">
            <div className="metric-value">{metrics.avgQuality}</div>
            <div className="metric-label">Avg Quality Score</div>
          </div>
        </div>
      </div>

      {/* Tabs (ordered as requested) */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          My Listings
        </button>
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Listings
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button 
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Add Crop
        </button>
      </div>

      {/* Tab Content - My Listings */}
      {activeTab === 'listings' && (
        <div className="tab-content">
          {listings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No listings yet</h3>
              <p>Add your first crop to get started!</p>
              <button 
                className="btn-primary"
                onClick={() => setActiveTab('add')}
              >
                Add New Crop
              </button>
            </div>
          ) : (
            <div className="listings-grid">
              {listings.map((listing) => (
                <div key={listing.id} className="listing-card">
                  <div className="listing-header">
                    <h3 className="listing-crop">{listing.crop}</h3>
                    <span className={`status-badge ${listing.status.toLowerCase()}`}>
                      {listing.status}
                    </span>
                  </div>
                  <div className="listing-details">
                    <div className="detail-row">
                      <span className="detail-label">📍 Location:</span>
                      <span className="detail-value">{listing.location}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">🏷️ Category:</span>
                      <span className="detail-value">{listing.category}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">⚖️ Quantity:</span>
                      <span className="detail-value">{listing.quantity} kg</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">💰 Price:</span>
                      <span className="detail-value">₹{listing.price}/kg</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">✨ Quality:</span>
                      <span className="quality-badge-inline">
                        {listing.quality >= 80 ? '🌟 Fresh' : '✓ Good'}
                      </span>
                    </div>
                  </div>
                  <div className="listing-actions">
                    <button className="btn-outline">View Details</button>
                    <button className="btn-outline">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content - All Listings (read-only) */}
      {activeTab === 'all' && (
        <div className="tab-content">
          {listings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🌾</div>
              <h3>No listings yet — add your first crop!</h3>
              <p>All your crops will appear here once added.</p>
            </div>
          ) : (
            <div className="listings-grid">
              {listings.map((listing) => (
                <div key={`all-${listing.id}`} className="listing-card">
                  <div className="listing-header">
                    <h3 className="listing-crop">{listing.crop}</h3>
                    <span className={`status-badge ${listing.status?.toLowerCase?.() || 'active'}`}>
                      {listing.status || 'Active'}
                    </span>
                  </div>

                  <div className="listing-details">
                    <div className="detail-row">
                      <span className="detail-label">⚖️ Quantity:</span>
                      <span className="detail-value">{listing.quantity ?? '—'} kg</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">💰 Price:</span>
                      <span className="detail-value">{listing.price ? `₹${listing.price}/kg` : '—'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">✨ Quality Score:</span>
                      <span className="quality-badge-inline">{listing.quality ?? '—'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">📅 Created:</span>
                      <span className="detail-value">{listing.created_at || listing.createdAt || '—'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content - Analytics */}
      {activeTab === 'analytics' && (
        <div className="tab-content">
          <div className="analytics-placeholder">
            <div className="placeholder-icon">📊</div>
            <h3>Analytics Coming Soon</h3>
            <p>Track your sales performance, price trends, and market insights.</p>
          </div>
        </div>
      )}

      {/* Tab Content - Add Crop */}
      {activeTab === 'add' && (
        <div className="tab-content">
          <div className="add-crop-section">
            <h2>👨‍🌾 Add New Crop</h2>
            <p className="section-subtitle">Tell us what you have to sell</p>

        {/* Voice Input Card */}
        <div className="card input-card">
          <label htmlFor="voiceInput" className="input-label">
            Describe your produce (Hindi/English):
          </label>
          <div className="input-wrapper">
            <textarea
              id="voiceInput"
              value={voiceInput}
              onChange={(e) => setVoiceInput(e.target.value)}
              placeholder="Example: Mere paas 50 kilo tamatar hai"
              className="input-textarea"
              rows="3"
            />
            <button
              onClick={handleMicClick}
              disabled={!speechSupported}
              className={`btn-mic ${isListening ? 'listening' : ''}`}
              title={speechSupported ? (isListening ? 'Stop listening' : 'Start listening') : 'Speech recognition not supported'}
            >
              {isListening ? '🛑' : '🎤'}
            </button>
          </div>
          {speechStatus && (
            <div className="speech-status">
              {speechStatus}
            </div>
          )}
          {!speechSupported && (
            <div className="speech-not-supported">
              ⚠️ Speech recognition not supported in your browser
            </div>
          )}
          <button
            onClick={handleVoiceInput}
            disabled={loading}
            className="btn-primary btn-large"
          >
            {loading ? 'Processing...' : '🎤 Process Input'}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Extracted Crop Info */}
        {extractedCrop && (
          <div className="card crop-info-card">
            <h3>📊 Your Produce</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Crop:</span>
                <span className="info-value">{extractedCrop.crop}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Quantity:</span>
                <span className="info-value">{extractedCrop.quantity} kg</span>
              </div>
            </div>
          </div>
        )}

        {/* Price Prediction Card */}
        {priceData && (
          <div className="card price-card">
            <h3>💰 AI Fair Price</h3>
            <div className="price-display">
              <div className="price-range">
                <span className="price-label">Fair Price Range:</span>
                <span className="price-value">
                  ₹{priceData.min_price} - ₹{priceData.max_price}
                </span>
              </div>
              <div className="price-predicted">
                <span className="price-label">Predicted Price:</span>
                <span className="price-value highlight">
                  ₹{priceData.predicted_price}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Quality Verification Card */}
        {qualityData && (
          <div className="card quality-card">
            <h3>🔍 Quality Verification</h3>
            <div className="quality-grid">
              <div className="quality-item">
                <span className="quality-label">Temperature:</span>
                <span className="quality-value">{qualityData.temperature}°C</span>
              </div>
              <div className="quality-item">
                <span className="quality-label">Humidity:</span>
                <span className="quality-value">{qualityData.humidity}%</span>
              </div>
              <div className="quality-item">
                <span className="quality-label">Freshness:</span>
                <span className="quality-value">{qualityData.freshness}/100</span>
              </div>
            </div>
            <div className="quality-badge-container">
              {qualityData.quality_verified ? (
                <span className="badge badge-success">
                  ✓ Quality Verified 🌿
                </span>
              ) : (
                <span className="badge badge-warning">
                  ⚠ Review Conditions
                </span>
              )}
            </div>
          </div>
        )}

        {/* Add Listing Button */}
        {extractedCrop && priceData && (
          <button
            onClick={handleAddListing}
            disabled={loading}
            className="btn-primary btn-large btn-add-listing"
          >
            {loading ? 'Adding...' : '✅ Add to Marketplace'}
          </button>
        )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Farmer;
