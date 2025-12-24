# 🌾 Gaon Bazar - Fair Prices. Trusted Quality.

**A comprehensive government agricultural portal + farmer-to-buyer marketplace with voice input, price prediction, and quality verification**

> Government Support Portal • Farmer Marketplace • Direct B2B Transactions

[![GitHub](https://img.shields.io/badge/GitHub-Gaon--Bazar-green)](https://github.com/Gaon-Bazar/gaon-bazaar)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.8+-blue)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![Status](https://img.shields.io/badge/Status-Active--Development-brightblue)](#-quick-start)

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ (with pip)
- Node.js 14+ (with npm)

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
# Backend runs on http://localhost:8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
# Frontend runs on http://localhost:3000
```

### 3. Access the App
Open **http://localhost:3000** in your browser to explore the portal!

---

## 📍 Portal Structure

### **Home Page (/) - Government Support Portal**
Main landing page with 4 information cards:
- **Government Schemes** → Explore PM-KISAN, Crop Insurance, MSP programs
- **Subsidies & Benefits** → View seed, equipment, and loan subsidies
- **Events & Training** → Upcoming workshops and awareness sessions
- **Announcements** → Official notices and policy updates

Each card navigates to a detailed page with full information and action buttons.

### **Detail Pages**
- `/schemes` - 6+ government schemes with eligibility and benefits
- `/subsidies` - 6+ subsidy programs with max amounts
- `/events` - Upcoming workshops, dates, locations, speakers
- `/announcements` - Official notices with priority levels

### **Marketplace (Role-based)**
- `/farmer` - Add crops with voice input, see prices, verify quality
- `/buyer` - Browse listings, view prices & quality scores, order crops

---

## ✨ Key Features

### 🎤 Voice Input (Hindi/Hinglish Support)
- Click 🎤 button to speak in Hindi or Hinglish
- Example: "mere pass 5 kilo gehun hai" → Extracts wheat, 5kg
- Automatic crop and quantity detection
- 30+ crop variations supported (gehu/gehun, tamatar, pyaaz, etc.)

### 💰 Fair Price Prediction
- AI-powered price suggestions for all crops
- Mock pricing endpoint with realistic market prices
- Price range display (₹min - ₹max per unit)
- Instant price lookup on marketplace

### 🌡️ IoT Quality Verification
- Temperature and humidity scoring (0-100 freshness scale)
- Automatic quality badges (Fresh/Good/Fair)
- Storage standard compliance checking
- Quality verification for buyer confidence

### 👥 Government Portal Integration
- Schemes, subsidies, and benefits information
- Event calendar and registration
- Official announcements and notices
- Easy access from header (👨‍🌾 Farmer / 🛒 Buyer buttons)

### 🔄 Farmer-to-Buyer Marketplace
- **Farmer Mode:** Voice input → Price → Quality → List crop
- **Buyer Mode:** Browse → View quality → Confirm order
- One-click role switching
- No authentication required

---

## 📁 Project Structure

```
gaon-bazaar/
├── backend/                      # FastAPI backend
│   ├── main.py                  # Entry point with voice, iot, buyer routers
│   ├── voice.py                 # Hindi/Hinglish crop parsing (30+ crops)
│   ├── iot.py                   # Quality verification (temp/humidity)
│   ├── buyer.py                 # Listings & order management
│   ├── models.py                # Pydantic request/response schemas
│   └── requirements.txt          # Python dependencies
│
├── frontend/                     # React 18+ with Router
│   ├── public/
│   ├── src/
│   │   ├── App.js               # Main router, header, footer
│   │   ├── components/
│   │   │   ├── Farmer.js        # Farmer marketplace interface
│   │   │   ├── Buyer.js         # Buyer marketplace interface
│   │   │   ├── HeroSection.jsx  # (Removed from detail pages)
│   │   │   └── [other sections]
│   │   ├── pages/
│   │   │   ├── HomePage.jsx     # Home with 4 main cards
│   │   │   ├── SchemesDetailPage.jsx      # Schemes grid (6+ cards)
│   │   │   ├── SubsidiesDetailPage.jsx    # Subsidies grid (6+ cards)
│   │   │   ├── EventsDetailPage.jsx       # Events grid (6+ cards)
│   │   │   ├── AnnouncementsDetailPage.jsx# Notices board (6+ items)
│   │   │   └── RolePicker.js    # (Removed from flow)
│   │   ├── styles/
│   │   │   ├── HomePage.css     # Hero + main 4 cards
│   │   │   ├── DetailPages.css  # Schemes, Subsidies, Events, Announcements
│   │   │   └── [component styles]
│   │   ├── api.js               # Axios client with Supabase support
│   │   └── index.js
│   └── package.json
│
├── ml/                           # Machine learning
│   └── train_model.py           # Model training (optional)
│
├── data/                         # Datasets
│   └── prices.csv               # Sample price data
│
└── README.md
```

---

## 🔌 API Endpoints

### Voice Input
```bash
POST /api/voice-input
{ "text": "mere pass 5 kilo gehun hai" }
→ { "crop": "wheat", "quantity": 5, "unit": "kg" }
```

### Price Prediction
```bash
POST /api/predict-price
{ "crop": "wheat" }
→ { "crop": "wheat", "min_price": 2000, "max_price": 2500, "currency": "INR" }
```

### Quality Verification
```bash
POST /api/iot/quality
{ "temperature": 20.5, "humidity": 65.0 }
→ { "freshness_score": 85, "status": "Fresh", "temperature": 20.5, "humidity": 65.0 }
```

### Marketplace
```bash
GET /api/buyer/listings
POST /api/farmer/add-listing
POST /api/buyer/order
```

---

## 🎯 User Journeys

### Farmer Journey
1. Open http://localhost:3000
2. Click **👨‍🌾 Farmer** in header (top-right)
3. Speak into 🎤 button: "mere pass 10 kilo tamatar hai" (I have 10kg tomatoes)
4. System extracts: crop=tomato, quantity=10
5. View fair price: ₹1500 - ₹1800
6. Enter quality (temp/humidity) → Score: 87/100
7. Click "Add to Marketplace"
8. Listing appears on Buyer side

### Buyer Journey
1. Open http://localhost:3000
2. Click **🛒 Buyer** in header (top-right)
3. Browse farmer listings with crop, quantity, quality, price
4. Click "Confirm Order" to purchase
5. Use "Switch Role" to return to home

### Government Portal Journey
1. Open http://localhost:3000
2. Explore 4 main cards on homepage
3. Click "Learn More" on any card
4. View detailed information and action buttons
5. Back button returns to home

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18+, React Router, Axios |
| **Backend** | FastAPI, Python 3.8+ |
| **Voice Processing** | Web Speech API (Browser native) |
| **Quality Check** | Custom Python logic (temp/humidity) |
| **Database** | In-Memory (mock), ready for PostgreSQL |
| **Styling** | CSS3 (responsive, government portal theme) |
| **Deployment** | Local development, Docker-ready |

---

## 📊 Supported Crops

**30+ crop variations** including:
- Wheat (gehu, gehun)
- Tomato (tamatar, tomato)
- Onion (pyaaz)
- Rice (chawal, rice)
- Potato (aalu, alu)
- Carrot, Cabbage, Brinjal, Cauliflower, Cucumber, Chilli, Garlic, Mango, Banana, and more

Works in English, Hindi, and Hinglish

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Check Python version (need 3.8+)
python --version

# Kill existing Python process
Get-Process python | Stop-Process
```

### Frontend issues
```bash
# Clear and reinstall
rm -r node_modules package-lock.json
npm install
npm start
```

### Voice input not working
- Use Chrome, Edge, or Safari (Web Speech API support)
- Check microphone permissions
- Try different language (hi-IN for Hindi)

### Price endpoint error
- Ensure crop name is valid
- Check backend logs for errors
- All standard crops have mock prices available

---

## 📝 Current Status

✅ **Completed:**
- Government portal with 4 main sections
- Detail pages for schemes, subsidies, events, announcements
- Voice input with Hindi/Hinglish support (🎤 button)
- Farmer-to-buyer marketplace
- Price prediction API
- Quality verification (IoT mock)
- Professional government portal UI
- Mobile-responsive design
- Role-based navigation (👨‍🌾 / 🛒)

⚠️ **In Progress:**
- Real ML model training
- Database integration (PostgreSQL)
- Payment gateway
- Admin dashboard
- Real price feeds

---

## 📈 Roadmap

- [ ] Database persistence (PostgreSQL/Supabase)
- [ ] User authentication & profiles
- [ ] Payment integration (Razorpay/Stripe)
- [ ] Real ML price prediction model
- [ ] Real-time price feeds from APMC
- [ ] Admin dashboard for monitoring
- [ ] Mobile app (React Native)
- [ ] Blockchain transaction verification
- [ ] SMS/Email notifications
- [ ] Multi-language support

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

## 👥 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Last Updated:** December 25, 2025  
**Status:** Active Development  
**Demo:** http://localhost:3000

└── README.md                  # This file
```

---

## 🔌 API Endpoints

### Voice Input
```bash
POST /api/voice-input
Content-Type: application/json

{
  "text": "mere pass 5 kilo gehun hai"
}

Response:
{
  "crop": "wheat",
  "quantity": 5,
  "unit": "kg"
}
```

### Price Prediction
```bash
POST /api/predict-price
Content-Type: application/json

{
  "crop": "wheat"
}

Response:
{
  "crop": "wheat",
  "min_price": 2000,
  "max_price": 2500,
  "currency": "INR"
}
```

### IoT Quality Check
```bash
POST /api/iot/quality
Content-Type: application/json

{
  "temperature": 20.5,
  "humidity": 65.0
}

Response:
{
  "freshness_score": 85,
  "status": "Fresh",
  "temperature": 20.5,
  "humidity": 65.0
}
```

### Buyer Listings
```bash
GET /api/buyer/listings

Response:
[
  {
    "id": 1,
    "crop": "wheat",
    "quantity": 5,
    "price_min": 2000,
    "price_max": 2500,
    "quality_score": 85,
    "farmer_id": "farmer_001"
  }
]
```

### Add Listing (Farmer)
```bash
POST /api/farmer/add-listing
Content-Type: application/json

{
  "crop": "wheat",
  "quantity": 5,
  "quality_score": 85
}
```

---

## 🎯 How to Use

### As a Farmer
1. Open http://localhost:3000
2. Select **Farmer** role
3. Click the **🎤 button** to speak:
   - "mere pass 5 kilo gehun hai" → Wheat, 5kg extracted
4. View fair price suggestion
5. Verify quality (temperature/humidity)
6. Click **Add to Marketplace**
7. Listing appears on buyer's marketplace

### As a Buyer
1. Open http://localhost:3000
2. Select **Buyer** role
3. Browse farmer listings
4. See crop, quantity, quality, and price
5. Click **Confirm Order** to purchase
6. Use **Switch Role** to change between Farmer/Buyer

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, React Router, Axios |
| **Backend** | FastAPI, Python 3.8+ |
| **Database** | In-Memory (current), PostgreSQL ready |
| **Voice Processing** | Web Speech API (Browser) |
| **Styling** | CSS3 with responsive design |
| **Deployment** | Local development, ready for Docker |

---

## 🔄 Workflow Example

```
Farmer speaks:         "mere pass 10 kilo pyaaz hai"
        ↓
Voice Parser extracts: {crop: "onion", quantity: 10}
        ↓
Price Model predicts:  ₹1500 - ₹1800 per 10kg
        ↓
IoT Quality Check:     Freshness Score: 88/100
        ↓
Listing Added:         Visible to all buyers
        ↓
Buyer confirms order:  Transaction logged
```

---

## 📊 Supported Crops

Current implementation supports: Wheat, Tomato, Onion, Rice, Potato, Carrot, Cabbage, Brinjal, Cauliflower, Cucumber, Chilli, Garlic, Mango, Banana, and more.

Crop names work in:
- **English:** wheat, tomato, onion
- **Hindi:** gehu/gehun, tamatar, pyaaz
- **Hinglish:** gehu, tamatar, pyaaz

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Should be 3.8+

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Check port 8000 is free
# If occupied, change in main.py: uvicorn.run(..., port=8001)
```

### Frontend build errors
```bash
# Clear cache and reinstall
rm -r node_modules package-lock.json
npm install
npm start
```

### Voice input not working
- Ensure browser supports Web Speech API (Chrome, Edge, Safari)
- Check microphone permissions
- Try different browser if issues persist
- Supported languages: `hi-IN` (Hindi), `en-IN` (English)

### Price endpoint returns 500 error
- Ensure crop name is valid (check supported crops list)
- Check backend logs for errors
- Mock pricing is available for all standard crops

---

## 📝 Notes

- **No Authentication:** Current version uses role picker instead of login
- **In-Memory Storage:** Listings reset on backend restart (ready for DB migration)
- **Voice API:** Uses browser's native Web Speech API (no external API)
- **Responsiveness:** Works on desktop and mobile browsers
- **Development Mode:** Uses hot-reload for both frontend and backend

---

## 📈 Roadmap

- [ ] Database integration (PostgreSQL/Supabase)
- [ ] Persistent user authentication
- [ ] Payment gateway integration
- [ ] Real ML model for price prediction
- [ ] Admin dashboard for market monitoring
- [ ] Mobile app (React Native)
- [ ] Blockchain-based transaction verification
- [ ] Real-time price feeds

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

## 👥 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Last Updated:** December 24, 2025  
**Status:** Active Development
