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
  );
}

export default Farmer;
