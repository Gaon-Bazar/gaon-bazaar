from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()

class IoTQualityData(BaseModel):
    temperature: float
    humidity: float
    freshness: int
    quality_verified: bool

def calculate_freshness_score(temperature: float, humidity: float) -> int:
    """
    Calculate freshness score based on storage conditions.
    
    Logic:
    - If temperature between 15-25°C AND humidity between 55-75%
      Then freshness score > 85 (ideal conditions)
    - Otherwise freshness score < 70 (suboptimal conditions)
    
    Args:
        temperature: Temperature in Celsius
        humidity: Humidity percentage (0-100)
    
    Returns:
        Freshness score (0-100)
    """
    
    # Check if conditions are ideal
    ideal_temp = 15 <= temperature <= 25
    ideal_humidity = 55 <= humidity <= 75
    
    if ideal_temp and ideal_humidity:
        # Good conditions: freshness above 85
        freshness = random.randint(85, 95)
    else:
        # Suboptimal conditions: freshness below 70
        freshness = random.randint(50, 70)
    
    return freshness

@router.get("/iot/quality", response_model=IoTQualityData)
async def get_iot_quality():
    """
    Get IoT quality verification data for stored produce.
    
    Returns simulated but realistic sensor data:
    - temperature: Storage temperature in Celsius
    - humidity: Storage humidity percentage
    - freshness: Calculated freshness score (0-100)
    - quality_verified: Boolean indicating if conditions are acceptable
    
    Example response:
    {
      "temperature": 18,
      "humidity": 65,
      "freshness": 92,
      "quality_verified": true
    }
    """
    
    # Simulate realistic sensor readings for vegetable storage
    # Ideal storage conditions for most vegetables
    temperature = round(random.uniform(14, 26), 1)
    humidity = random.randint(50, 80)
    
    # Calculate freshness score
    freshness = calculate_freshness_score(temperature, humidity)
    
    # Quality verified if temperature and humidity in ideal range
    quality_verified = (15 <= temperature <= 25) and (55 <= humidity <= 75)
    
    return IoTQualityData(
        temperature=temperature,
        humidity=humidity,
        freshness=freshness,
        quality_verified=quality_verified
    )
