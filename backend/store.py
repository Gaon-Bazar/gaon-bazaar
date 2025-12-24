from datetime import datetime
from typing import List, Dict, Optional

# In-memory storage for farmer listings (temporary for hackathon demo)
listings_db: List[Dict] = []
listing_counter = 0

def add_listing(crop: str, quantity: int, location: str = "Village X", language: str = "Hindi") -> Dict:
    """
    Add a new farmer listing to the in-memory store.
    
    Args:
        crop: Name of the crop
        quantity: Quantity in kilos
        location: Farmer's location
        language: Input language
    
    Returns:
        Dictionary with listing details and ID
    """
    global listing_counter
    listing_counter += 1
    
    listing = {
        "id": listing_counter,
        "crop": crop,
        "quantity": quantity,
        "location": location,
        "language": language,
        "timestamp": datetime.now().isoformat(),
        "status": "available"
    }
    
    listings_db.append(listing)
    return listing

def get_all_listings() -> List[Dict]:
    """
    Retrieve all farmer listings from the in-memory store.
    
    Returns:
        List of all listings
    """
    return listings_db.copy()

def get_listing_by_id(listing_id: int) -> Optional[Dict]:
    """
    Get a specific listing by ID.
    
    Args:
        listing_id: ID of the listing
    
    Returns:
        Listing details or None if not found
    """
    for listing in listings_db:
        if listing["id"] == listing_id:
            return listing
    return None

def get_listings_by_crop(crop: str) -> List[Dict]:
    """
    Get all listings for a specific crop.
    
    Args:
        crop: Crop name to filter by
    
    Returns:
        List of listings for that crop
    """
    return [listing for listing in listings_db if listing["crop"].lower() == crop.lower()]

def clear_listings():
    """Clear all listings (for testing/reset)"""
    global listing_counter
    global listings_db
    listings_db = []
    listing_counter = 0

def delete_listing(listing_id: int) -> bool:
    """
    Delete a listing by ID.
    
    Args:
        listing_id: ID of the listing to delete
    
    Returns:
        True if deleted, False if not found
    """
    global listings_db
    for i, listing in enumerate(listings_db):
        if listing["id"] == listing_id:
            listings_db.pop(i)
            return True
    return False

def get_store_stats() -> Dict:
    """
    Get statistics about the current listings.
    
    Returns:
        Dictionary with store statistics
    """
    if not listings_db:
        return {
            "total_listings": 0,
            "total_quantity": 0,
            "unique_crops": 0
        }
    
    crops = set(listing["crop"] for listing in listings_db)
    total_quantity = sum(listing["quantity"] for listing in listings_db)
    
    return {
        "total_listings": len(listings_db),
        "total_quantity": total_quantity,
        "unique_crops": len(crops),
        "crops": list(crops)
    }
