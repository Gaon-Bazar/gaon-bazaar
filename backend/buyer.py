from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from store import get_all_listings, add_listing
from datetime import datetime

router = APIRouter()

class ListingItem(BaseModel):
    crop: str
    quantity: int
    min_price: float
    max_price: float
    quality_verified: bool
    location: str = "Village X"
    timestamp: str = None

class OrderConfirmation(BaseModel):
    message: str
    order_id: int = None
    crop: str = None
    quantity: int = None
    timestamp: str = None

# Simple order counter for demo
order_counter = 0

def get_price_range_for_crop(crop: str) -> tuple:
    """
    Get realistic price range for a crop.
    In production, this would call the ML model.
    
    For now, using dummy values based on crop type.
    """
    price_ranges = {
        "tomato": (25, 35),
        "potato": (15, 25),
        "onion": (20, 30),
        "carrot": (30, 40),
        "cucumber": (25, 35),
        "eggplant": (30, 45),
    }
    
    # Default range if crop not in mapping
    min_price, max_price = price_ranges.get(crop.lower(), (20, 40))
    return min_price, max_price

@router.get("/buyer/listings", response_model=List[ListingItem])
async def get_buyer_listings():
    """
    Get all farmer listings for buyers.
    
    Includes:
    - Crop name and quantity
    - AI-predicted fair price range
    - IoT-verified quality status
    
    Example response:
    [
      {
        "crop": "tomato",
        "quantity": 50,
        "min_price": 28,
        "max_price": 32,
        "quality_verified": true,
        "location": "Village X",
        "timestamp": "2025-12-24T15:30:00"
      }
    ]
    """
    
    # Get all listings from in-memory store
    all_listings = get_all_listings()
    
    # Format listings for buyer view
    buyer_listings = []
    for listing in all_listings:
        min_price, max_price = get_price_range_for_crop(listing["crop"])
        
        buyer_listing = ListingItem(
            crop=listing["crop"],
            quantity=listing["quantity"],
            min_price=float(min_price),
            max_price=float(max_price),
            quality_verified=True,  # Demo: always true for now
            location=listing.get("location", "Village X"),
            timestamp=listing.get("timestamp", datetime.now().isoformat())
        )
        buyer_listings.append(buyer_listing)
    
    return buyer_listings

@router.post("/buyer/order", response_model=OrderConfirmation)
async def confirm_order(crop: str, quantity: int):
    """
    Confirm an order for a crop.
    
    Args:
        crop: Name of the crop to order
        quantity: Quantity to order (in kilos)
    
    Returns:
        Order confirmation with order ID
    
    Example:
    POST /buyer/order?crop=tomato&quantity=25
    
    Response:
    {
      "message": "Order confirmed successfully",
      "order_id": 1,
      "crop": "tomato",
      "quantity": 25,
      "timestamp": "2025-12-24T15:30:00"
    }
    """
    
    global order_counter
    
    if not crop or quantity <= 0:
        raise HTTPException(
            status_code=400,
            detail="Invalid crop or quantity"
        )
    
    order_counter += 1
    
    return OrderConfirmation(
        message="Order confirmed successfully",
        order_id=order_counter,
        crop=crop,
        quantity=quantity,
        timestamp=datetime.now().isoformat()
    )

class AddListingRequest(BaseModel):
    crop: str
    quantity: int
    location: str = "Village X"

@router.post("/farmer/add-listing")
async def farmer_add_listing(request: AddListingRequest):
    """
    Add a farmer listing to the marketplace.
    
    This endpoint is used by farmers to add their produce to the marketplace.
    In production, this would be called after voice input processing.
    
    Args:
        crop: Name of the crop
        quantity: Quantity in kilos
        location: Farmer's location
    
    Returns:
        Listing details with ID
    """
    listing = add_listing(
        crop=request.crop,
        quantity=request.quantity,
        location=request.location,
        language="Hindi"
    )
    return listing
