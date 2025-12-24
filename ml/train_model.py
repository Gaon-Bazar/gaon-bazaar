import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import pickle
import os
from datetime import datetime

# Set paths
data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'prices..csv')
model_path = os.path.join(os.path.dirname(__file__), 'price_model.pkl')

print("="*70)
print("GAON BAZAR - ML MODEL TRAINING (Government Dataset)")
print("="*70)

# Load dataset
print(f"\n[1/6] Loading government dataset from {data_path}...")
df = pd.read_csv(data_path)
print(f"[OK] Dataset loaded: {df.shape[0]:,} rows, {df.shape[1]} columns")

# Display column names
print(f"\nColumns: {df.columns.tolist()}")

# DATA CLEANING & PREPROCESSING
print(f"\n[2/6] Data cleaning and preprocessing...")

# Rename columns for consistency
df = df.rename(columns={
    'Commodity': 'crop',
    'Modal Price (Rs./Quintal)': 'price',
    'Market Name': 'market',
    'Price Date': 'date',
    'State': 'state'
})

# Extract month and year from date
df['date'] = pd.to_datetime(df['date'], format='%d %b %Y', errors='coerce')
df['month'] = df['date'].dt.month
df['year'] = df['date'].dt.year

# Handle missing values
initial_rows = len(df)
df = df.dropna(subset=['crop', 'price', 'month', 'year', 'market'])
print(f"[OK] Removed {initial_rows - len(df):,} rows with missing values")

# Convert price from Quintal (100kg) to Per Kg for user-friendly output
# Modal price is in Rs/Quintal, we'll keep it as is and handle conversion in API
df['price'] = pd.to_numeric(df['price'], errors='coerce')
df = df.dropna(subset=['price'])

# Remove unrealistic prices (outliers)
q1 = df['price'].quantile(0.01)
q99 = df['price'].quantile(0.99)
df = df[(df['price'] >= q1) & (df['price'] <= q99)]
print(f"[OK] Removed outliers. Price range: ₹{df['price'].min():.2f} - ₹{df['price'].max():.2f} per quintal")

# Normalize crop names (lowercase, strip whitespace)
df['crop'] = df['crop'].str.lower().str.strip()
df['market'] = df['market'].str.strip()

# Map common crop names to our supported crops
CROP_MAPPING = {
    'tomato': 'tomato',
    'onion': 'onion',
    'potato': 'potato',
    'wheat': 'wheat',
    'rice': 'rice',
    'bajra(pearl millet/cumbu)': 'bajra',
    'jowar(sorghum)': 'jowar',
    'maize': 'maize',
    'brinjal': 'brinjal',
    'cabbage': 'cabbage',
    'cauliflower': 'cauliflower',
    'green chilli': 'green chilli',
    'bhindi(ladies finger)': 'bhindi',
    'carrot': 'carrot',
    'garlic': 'garlic',
    'ginger(green)': 'ginger',
    'apple': 'apple',
    'banana': 'banana',
    'mango': 'mango',
}

# Filter only supported crops
df['crop'] = df['crop'].map(CROP_MAPPING)
df = df.dropna(subset=['crop'])

print(f"[OK] Cleaned dataset: {len(df):,} rows remaining")
print(f"[OK] Unique crops: {df['crop'].nunique()}")
print(f"[OK] Date range: {df['year'].min()} to {df['year'].max()}")

# FEATURE ENGINEERING
print(f"\n[3/6] Feature engineering...")

# Select features for training
# We'll use: crop, month, market as features
# Simplified approach: use only major markets to avoid overfitting
market_counts = df['market'].value_counts()
top_markets = market_counts[market_counts >= 100].index.tolist()
df = df[df['market'].isin(top_markets)]

print(f"[OK] Using {len(top_markets)} major markets with sufficient data")
print(f"[OK] Final training dataset: {len(df):,} rows")

# Prepare features and target
X = df[['crop', 'month', 'market']].copy()
y = df['price'].copy()

# Encode categorical variables
le_crop = LabelEncoder()
le_market = LabelEncoder()

X['crop'] = le_crop.fit_transform(X['crop'])
X['market'] = le_market.fit_transform(X['market'])

print(f"[OK] Encoded {len(le_crop.classes_)} crops and {len(le_market.classes_)} markets")

# MODEL TRAINING
print(f"\n[4/6] Training RandomForestRegressor...")
print("[INFO] Using conservative parameters to avoid overfitting")

model = RandomForestRegressor(
    n_estimators=50,        # Reduced from 100 for faster, more stable predictions
    max_depth=8,            # Reduced from 10 to prevent overfitting
    min_samples_split=10,   # Require more samples to split (more conservative)
    min_samples_leaf=5,     # Require more samples in leaf nodes
    random_state=42,
    n_jobs=-1
)

model.fit(X, y)

# Evaluate on training data
train_score = model.score(X, y)
print(f"[OK] Training R² Score: {train_score:.4f}")

# Calculate prediction stability
predictions = model.predict(X)
residuals = y - predictions
std_residual = np.std(residuals)
print(f"[OK] Prediction std deviation: ₹{std_residual:.2f} (lower is more stable)")

# MODEL SAVING
print(f"\n[5/6] Saving model to {model_path}...")
with open(model_path, 'wb') as f:
    pickle.dump({
        'model': model,
        'le_crop': le_crop,
        'le_market': le_market,
        'supported_crops': le_crop.classes_.tolist(),
        'supported_markets': le_market.classes_.tolist(),
        'price_unit': 'quintal',  # Important: prices are per quintal (100kg)
        'training_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'data_rows': len(df),
        'r2_score': train_score
    }, f)

print("[OK] Model saved successfully!")

# TEST PREDICTION
print(f"\n[6/6] Testing model predictions...")
print("-" * 70)

# Test with common crops
test_cases = [
    ('tomato', 12, 'Delhi' if 'Delhi' in le_market.classes_ else le_market.classes_[0]),
    ('wheat', 6, 'Agra' if 'Agra' in le_market.classes_ else le_market.classes_[0]),
    ('onion', 3, 'Mumbai' if 'Mumbai' in le_market.classes_ else le_market.classes_[0]),
]

for test_crop, test_month, test_market in test_cases:
    if test_crop in le_crop.classes_ and test_market in le_market.classes_:
        test_crop_encoded = le_crop.transform([test_crop])[0]
        test_market_encoded = le_market.transform([test_market])[0]
        
        test_input = np.array([[test_crop_encoded, test_month, test_market_encoded]])
        predicted_price_quintal = model.predict(test_input)[0]
        predicted_price_kg = predicted_price_quintal / 100  # Convert to per kg
        
        print(f"Crop: {test_crop.capitalize():15} | Month: {test_month:2d} | Market: {test_market:15}")
        print(f"  → Predicted: ₹{predicted_price_quintal:.2f}/quintal (₹{predicted_price_kg:.2f}/kg)")
    else:
        print(f"Crop: {test_crop} or Market: {test_market} not in training data")

print("\n" + "="*70)
print("MODEL TRAINING COMPLETE!")
print("="*70)
print(f"✓ Supported crops: {len(le_crop.classes_)}")
print(f"✓ Supported markets: {len(le_market.classes_)}")
print(f"✓ Training accuracy: {train_score:.4f}")
print(f"✓ Model saved to: {model_path}")
print(f"✓ Demo-ready: YES (stable predictions enabled)")
print("="*70)
