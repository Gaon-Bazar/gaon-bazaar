from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np
import os

router = APIRouter()

class PricePredictionInput(BaseModel):
    crop: str
    month: int

class PricePredictionOutput(BaseModel):
    crop: str
    month: int
    min_price: float
    max_price: float
    predicted_price: float
    currency: str = "INR"
    unit: str = "kg"  # User-friendly unit

# Load model
model_path = os.path.join(os.path.dirname(__file__), '..', 'ml', 'price_model.pkl')

try:
    with open(model_path, 'rb') as f:
        model_data = pickle.load(f)
        model = model_data['model']
        le_crop = model_data['le_crop']
        le_market = model_data['le_market']
        supported_crops = model_data.get('supported_crops', le_crop.classes_.tolist())
        supported_markets = model_data.get('supported_markets', le_market.classes_.tolist())
        price_unit = model_data.get('price_unit', 'quintal')  # Check if price is per quintal or kg
        
    print("[OK] Price prediction model loaded successfully!")
    print(f"[INFO] Supported crops: {len(supported_crops)}")
    print(f"[INFO] Supported markets: {len(supported_markets)}")
    print(f"[INFO] Price unit in model: {price_unit}")
except FileNotFoundError:
    print("[WARN] Model file not found at " + model_path)
    print("Please run: python ml/train_model.py")
    model = None
    supported_crops = []
    supported_markets = []
    price_unit = 'quintal'

@router.post("/predict-price", response_model=PricePredictionOutput)
async def predict_price(prediction_input: PricePredictionInput):
    """
    Predict fair market price for a crop based on government data.
    
    Example input:
    {
      "crop": "tomato",
      "month": 12
    }
    
    Returns:
    {
      "crop": "tomato",
      "month": 12,
      "predicted_price": 30.5,
      "min_price": 27.45,
      "max_price": 33.55,
      "currency": "INR",
      "unit": "kg"
    }
    
    Note: Prices are converted from quintal (100kg) to per kg for user convenience.
    The prediction uses real government agricultural market data.
    """
    
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Price prediction model not loaded. Please train the model first."
        )
    
    crop = prediction_input.crop.lower().strip()
    month = prediction_input.month
    
    # Validate month
    if month < 1 or month > 12:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid month: {month}. Must be between 1 and 12."
        )
    
    # Check if crop is supported
    if crop not in supported_crops:
        raise HTTPException(
            status_code=400,
            detail=f"Crop '{crop}' not supported. Available crops: {', '.join(sorted(supported_crops)[:10])}..."
        )
    
    # Use a default market (first available) for simplicity in demo
    # In production, this could be based on user location
    default_market = supported_markets[0] if supported_markets else "Delhi"
    
    try:
        # Encode inputs
        crop_encoded = le_crop.transform([crop])[0]
        market_encoded = le_market.transform([default_market])[0]
        
        # Create feature vector (crop, month, market)
        features = np.array([[crop_encoded, month, market_encoded]])
        
        # Make prediction
        predicted_price_quintal = float(model.predict(features)[0])
        
        # Convert from quintal (100kg) to per kg for user-friendly display
        if price_unit == 'quintal':
            predicted_price_kg = predicted_price_quintal / 100
        else:
            predicted_price_kg = predicted_price_quintal  # Already in kg
        
        # Add ±15% variation for realistic price range
        # Government data shows natural price variation due to quality, market conditions
        variation_percent = 0.15
        min_price = round(predicted_price_kg * (1 - variation_percent), 2)
        max_price = round(predicted_price_kg * (1 + variation_percent), 2)
        predicted_price_kg = round(predicted_price_kg, 2)
        
        # Ensure minimum sensible prices (at least ₹1/kg)
        min_price = max(1.0, min_price)
        max_price = max(2.0, max_price)
        predicted_price_kg = max(1.5, predicted_price_kg)
        
        return PricePredictionOutput(
            crop=crop,
            month=month,
            predicted_price=predicted_price_kg,
            min_price=min_price,
            max_price=max_price,
            currency="INR",
            unit="kg"
        )
    
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error processing crop: {crop}. {str(e)}"
        )
    except Exception as e:
        print(f"[ERROR] Prediction failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Prediction error: {str(e)}"
        )
        raise HTTPException(
            status_code=500,
            detail=f"Error in price prediction: {str(e)}"
        )
