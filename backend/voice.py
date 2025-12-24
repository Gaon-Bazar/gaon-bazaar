from fastapi import APIRouter
from pydantic import BaseModel
import re

router = APIRouter()

class VoiceInput(BaseModel):
    text: str

class VoiceOutput(BaseModel):
    crop: str
    quantity: int

# Crop mapping - Hindi/Hinglish to English (matching government dataset)
CROP_MAPPING = {
    # Vegetables
    "tamatar": "tomato",
    "pyaz": "onion",
    "piyaj": "onion",
    "aloo": "potato",
    "gajar": "carrot",
    "patta gobhi": "cabbage",
    "phool gobhi": "cauliflower",
    "phoolkopi": "cauliflower",
    "baigan": "brinjal",
    "baingan": "brinjal",
    "bhindi": "bhindi",
    "lady finger": "bhindi",
    "mirch": "green chilli",
    "hari mirch": "green chilli",
    "lahsun": "garlic",
    "adrak": "ginger",
    
    # Grains & Cereals (with variations)
    "gehun": "wheat",
    "gehu": "wheat",
    "gehun": "wheat",
    "gehu": "wheat",
    "gehun": "wheat",
    "gandum": "wheat",
    "gum": "wheat",
    "wheat": "wheat",
    "chawal": "rice",
    "rice": "rice",
    "makka": "maize",
    "maize": "maize",
    "bajra": "bajra",
    "jowar": "jowar",
    "dhan": "paddy",
    "paddy": "paddy",
    
    # Fruits
    "seb": "apple",
    "apple": "apple",
    "kela": "banana",
    "banana": "banana",
    "aam": "mango",
    "mango": "mango",
    
    # English names (direct mapping)
    "tomato": "tomato",
    "onion": "onion",
    "potato": "potato",
    "carrot": "carrot",
    "cabbage": "cabbage",
    "cauliflower": "cauliflower",
    "garlic": "garlic",
    "ginger": "ginger",
}

def extract_crop_and_quantity(text: str) -> dict:
    """
    Extract crop name and quantity from Hindi/Hinglish text.
    
    Examples:
    - "Mere paas 50 kilo tamatar hai" -> {"crop": "tomato", "quantity": 50}
    - "100 kg aloo" -> {"crop": "potato", "quantity": 100}
    - "mere pass 5kg gehu hai" -> {"crop": "wheat", "quantity": 5}
    """
    
    text_lower = text.lower().strip()
    
    # Extract quantity (numbers followed by kilo/kg/units)
    quantity_match = re.search(r'(\d+)\s*(kilo|kg|kgs|bags|sacks|units)?', text_lower)
    quantity = int(quantity_match.group(1)) if quantity_match else 0
    
    # Extract crop name by matching against mapping
    # Try longest matches first to handle multi-word crops
    crop_found = "unknown"
    sorted_crops = sorted(CROP_MAPPING.keys(), key=len, reverse=True)
    for hindi_crop in sorted_crops:
        if hindi_crop in text_lower:
            crop_found = CROP_MAPPING[hindi_crop]
            break
    
    return {
        "crop": crop_found,
        "quantity": quantity
    }

@router.post("/voice-input", response_model=VoiceOutput)
async def process_voice_input(voice_input: VoiceInput):
    """
    Process voice input (as text) and extract crop details.
    
    Example input:
    {
      "text": "Mere paas 50 kilo tamatar hai"
    }
    
    Returns:
    {
      "crop": "tomato",
      "quantity": 50
    }
    """
    result = extract_crop_and_quantity(voice_input.text)
    return VoiceOutput(
        crop=result["crop"],
        quantity=result["quantity"]
    )
