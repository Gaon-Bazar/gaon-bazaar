import React, { useState } from 'react';
import axios from 'axios';
import './Farmer.css';

function Farmer() {
  const [voiceInput, setVoiceInput] = useState('');
  const [extractedCrop, setExtractedCrop] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [qualityData, setQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = 'http://127.0.0.1:8000/api';

  // Handle voice input processing
  const handleVoiceInput = async () => {
    if (!voiceInput.trim()) {
      setError('Please enter crop information');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Process voice input
      const voiceResponse = await axios.post(`${API_BASE}/voice-input`, {
        text: voiceInput
      });

      setExtractedCrop(voiceResponse.data);

      // Get price prediction
      const priceResponse = await axios.post(`${API_BASE}/predict-price`, {
        crop: voiceResponse.data.crop,
        month: new Date().getMonth() + 1
      });

      setPriceData(priceResponse.data);

      // Get quality verification
      const qualityResponse = await axios.get(`${API_BASE}/iot/quality`);
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
      const response = await axios.post(`${API_BASE}/farmer/add-listing`, {
        crop: extractedCrop.crop,
        quantity: extractedCrop.quantity,
        location: 'Your Village'
      });

      alert(`Listing added successfully! Listing ID: ${response.data.id}`);
      setVoiceInput('');
      setExtractedCrop(null);
      setPriceData(null);
    } catch (err) {
      setError('Failed to add listing. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="farmer-container">
      <div className="farmer-section">
        <h2>👨‍🌾 Farmer Input</h2>
        <p className="section-subtitle">Tell us what you have to sell</p>

        {/* Voice Input Card */}
        <div className="card input-card">
          <label htmlFor="voiceInput" className="input-label">
            Describe your produce (Hindi/English):
          </label>
          <textarea
            id="voiceInput"
            value={voiceInput}
            onChange={(e) => setVoiceInput(e.target.value)}
            placeholder="Example: Mere paas 50 kilo tamatar hai"
            className="input-textarea"
            rows="3"
          />
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
  );
}

export default Farmer;
