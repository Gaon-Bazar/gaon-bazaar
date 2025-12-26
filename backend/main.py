from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from voice import router as voice_router
# from price import router as price_router  # TODO: fix scipy import hang
from iot import router as iot_router
from buyer import router as buyer_router

# Mock price prediction (to replace disabled price router)
class PricePredictionRequest(BaseModel):
    crop: str
    month: int

class PricePredictionResponse(BaseModel):
    crop: str
    min_price: float
    max_price: float
    predicted_price: float
    unit: str

# Render deploy steps (for reference):
# 1) Go to render.com → New → Web Service
# 2) Select the backend folder, choose Runtime: Python
# 3) Set start command: uvicorn main:app --host 0.0.0.0 --port 10000
# 4) Add environment variable: PORT=10000
# 5) Deploy and use the provided Render URL in the frontend API base URL

# Initialize FastAPI app
app = FastAPI(
    title="Gaon Bazar API",
    description="Voice-first farmer marketplace with AI-based price prediction",
    version="0.1.0"
)

# Add CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(voice_router, prefix="/api", tags=["Voice Input"])
# app.include_router(price_router, prefix="/api", tags=["Price Prediction"])
app.include_router(iot_router, prefix="/api", tags=["IoT Quality Verification"])
app.include_router(buyer_router, prefix="/api", tags=["Buyer Marketplace"])

# Mock price prediction endpoint
@app.post("/api/predict-price", response_model=PricePredictionResponse)
def predict_price(request: PricePredictionRequest):
    """
    Mock price prediction. Returns realistic price ranges for common crops.
    In production, this would use the ML model.
    """
    # Simple mock prices based on crop type
    price_map = {
        "wheat": {"min": 20, "max": 25, "predicted": 22},
        "rice": {"min": 35, "max": 45, "predicted": 40},
        "tomato": {"min": 10, "max": 20, "predicted": 15},
        "onion": {"min": 15, "max": 25, "predicted": 20},
        "potato": {"min": 12, "max": 18, "predicted": 15},
        "carrot": {"min": 15, "max": 25, "predicted": 20},
        "cauliflower": {"min": 20, "max": 35, "predicted": 27},
        "cabbage": {"min": 10, "max": 18, "predicted": 14},
        "brinjal": {"min": 15, "max": 25, "predicted": 20},
        "garlic": {"min": 80, "max": 120, "predicted": 100},
        "apple": {"min": 50, "max": 80, "predicted": 65},
        "banana": {"min": 20, "max": 35, "predicted": 27},
        "mango": {"min": 40, "max": 70, "predicted": 55},
    }
    
    crop_lower = request.crop.lower()
    prices = price_map.get(crop_lower, {"min": 20, "max": 30, "predicted": 25})
    
    return PricePredictionResponse(
        crop=request.crop,
        min_price=prices["min"],
        max_price=prices["max"],
        predicted_price=prices["predicted"],
        unit="₹/kg"
    )

# Root endpoint
@app.get("/")
def read_root():
    """Welcome endpoint for Gaon Bazar API"""
    return {
        "message": "Welcome to Gaon Bazar API",
        "project": "Gaon Bazar - Voice-first Farmer Marketplace",
        "version": "0.1.0",
        "status": "running"
    }

# Health check endpoint
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
