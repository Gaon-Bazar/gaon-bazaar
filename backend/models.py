from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class VoiceInput(BaseModel):
    """Model for voice input text"""
    text: str

class VoiceOutput(BaseModel):
    """Model for extracted crop and quantity from voice"""
    crop: str
    quantity: int

class FarmerListing(BaseModel):
    """Model for farmer produce listing"""
    crop: str
    quantity: int
    location: str = "Village X"
    language: str = "Hindi"
    id: Optional[int] = None
    timestamp: Optional[datetime] = None

class ListingResponse(BaseModel):
    """Response model for listing creation"""
    id: int
    message: str
    crop: str
    quantity: int
    location: str

class AllListingsResponse(BaseModel):
    """Response model for fetching all listings"""
    total_listings: int
    listings: list
