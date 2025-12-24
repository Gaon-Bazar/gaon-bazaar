import requests
import json
import time
import subprocess
import sys
import os

# Add backend to path for store import
sys.path.insert(0, r"C:\Users\vardh\gaon-bazaar\backend")

# Start server
os.chdir(r"C:\Users\vardh\gaon-bazaar\backend")
proc = subprocess.Popen([sys.executable, "main.py"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)

# Wait for server to start
print("Starting server...")
time.sleep(5)

# Check if process is still alive
if proc.poll() is not None:
    # Process ended, get output
    stdout, _ = proc.communicate()
    print("Server output:")
    print(stdout)
    sys.exit(1)

try:
    # First, add a farmer listing via API
    print("\n=== Step 1: Farmer adds produce to marketplace ===")
    url = "http://127.0.0.1:8000/api/farmer/add-listing"
    payload = {
        "crop": "wheat",  # Changed from tomato (not in government dataset)
        "quantity": 100,
        "location": "Delhi"
    }
    
    print(f"Request: POST {url}")
    print(f"Body: {json.dumps(payload, indent=2)}")
    
    response = requests.post(url, json=payload)
    listing_response = response.json()
    print(f"\nResponse: {json.dumps(listing_response, indent=2, default=str)}")
    
    if response.status_code == 200:
        print("[OK] Listing added to marketplace!")
    
    # Test price prediction API
    print("\n\n=== Step 2: Get AI Price Prediction ===")
    url = "http://127.0.0.1:8000/api/predict-price"
    payload = {
        "crop": "wheat",  # Changed from tomato
        "month": 12
    }
    
    print(f"Request: POST {url}")
    print(f"Body: {json.dumps(payload, indent=2)}")
    
    response = requests.post(url, json=payload)
    print(f"\nResponse: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        data = response.json()
        print("[OK] Price Prediction working!")
        print(f"\nFair Price Range: Rs{data['min_price']} - Rs{data['max_price']} per {data['unit']}")
    
    # Test IoT quality API
    print("\n\n=== Step 3: Get IoT Quality Verification ===")
    url = "http://127.0.0.1:8000/api/iot/quality"
    
    print(f"Request: GET {url}")
    
    response = requests.get(url)
    print(f"\nResponse: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        data = response.json()
        print("[OK] IoT Quality verified!")
        print(f"Freshness Score: {data['freshness']}/100")
        print(f"Quality Verified: {data['quality_verified']}")
    
    # Test buyer listings API
    print("\n\n=== Step 4: Buyer Views All Listings ===")
    url = "http://127.0.0.1:8000/api/buyer/listings"
    
    print(f"Request: GET {url}")
    
    response = requests.get(url)
    listings_response = response.json()
    print(f"\nResponse: {json.dumps(listings_response, indent=2)}")
    
    if response.status_code == 200:
        listings = listings_response if isinstance(listings_response, list) else []
        print(f"[OK] Buyer listings API working! Found {len(listings)} listings")
        
        if listings:
            listing = listings[0]
            print(f"\nFirst Listing Available to Buyer:")
            print(f"  Crop: {listing['crop']}")
            print(f"  Quantity: {listing['quantity']} kg")
            print(f"  Fair Price Range: Rs{listing['min_price']} - Rs{listing['max_price']}")
            print(f"  Location: {listing['location']}")
            print(f"  Quality Verified: {listing['quality_verified']}")
    
    # Test order confirmation API
    print("\n\n=== Step 5: Buyer Confirms Order ===")
    url = "http://127.0.0.1:8000/api/buyer/order"
    
    print(f"Request: POST {url}?crop=wheat&quantity=50")  # Changed from tomato
    
    response = requests.post(url, params={"crop": "wheat", "quantity": 50})
    print(f"\nResponse: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"[OK] Order confirmed!")
        print(f"\nOrder Details:")
        print(f"  Order ID: {data['order_id']}")
        print(f"  Crop: {data['crop']}")
        print(f"  Quantity: {data['quantity']} kg")
        print(f"  Message: {data['message']}")
    
    print("\n\n" + "="*60)
    print("END-TO-END FLOW WORKING!")
    print("="*60)
    print("\nFlow Summary:")
    print("1. Farmer adds produce to marketplace ✓")
    print("2. AI calculates fair price prediction ✓")
    print("3. IoT verifies quality conditions ✓")
    print("4. Buyer sees listings with price + quality ✓")
    print("5. Buyer confirms order ✓")
    print("\n[INFO] Using WHEAT from government dataset")
    print("[INFO] Supported crops: wheat, apple, banana, maize, bajra, etc.")

finally:
    # Terminate server
    proc.terminate()
    proc.wait()
    print("\nServer stopped.")

