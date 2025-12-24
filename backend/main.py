from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from voice import router as voice_router
from price import router as price_router
from iot import router as iot_router
from buyer import router as buyer_router

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
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(voice_router, prefix="/api", tags=["Voice Input"])
app.include_router(price_router, prefix="/api", tags=["Price Prediction"])
app.include_router(iot_router, prefix="/api", tags=["IoT Quality Verification"])
app.include_router(buyer_router, prefix="/api", tags=["Buyer Marketplace"])

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
