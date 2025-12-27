# 🌾 Gaon Bazar

**Agricultural marketplace connecting farmers directly with buyers**

> Bilingual (EN/HI) • Voice Input • AI Pricing • Quality Verification • Government Schemes

[![Python](https://img.shields.io/badge/Python-3.12+-blue)](https://www.python.org/) [![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/) [![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)](https://fastapi.tiangolo.com/)

---

## 🎯 Key Features

- **🌐 Bilingual**: Full English/Hindi support with instant toggle
- **🎤 Voice Input**: Speak in Hindi/Hinglish to list crops  
- **💰 AI Pricing**: Real-time market price predictions
- **🌡️ Quality Check**: IoT-based freshness scoring
- **🛒 E-commerce**: Cart, checkout, order management
- **📚 Gov Portal**: Schemes, subsidies, events info

---

## � How It Works

![Gaon Bazar Workflow](assets/workflow%20of%20Gaon%20Bazar.jpeg)
*Complete workflow showing farmer-to-buyer journey: Voice listing → AI pricing → Quality verification → Direct marketplace trading*

---

## �🚀 Quick Start

**Prerequisites**: Python 3.12+, Node.js 14+

### Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # Windows | source .venv/bin/activate (Mac/Linux)
pip install -r requirements.txt
uvicorn main:app --reload
```
🌐 Backend: http://127.0.0.1:8000 | Docs: http://127.0.0.1:8000/docs

### Frontend
```bash
cd frontend
npm install --legacy-peer-deps
npm start
```
🌐 App: http://localhost:3000

---

## � Screenshots & Demo
### 🎬 Product Demo - Ramu Kaka's Journey
https://github.com/user-attachments/assets/How%20life%20of%20Ramu%20kaka%20evolved.mp4

*Watch how Gaon Bazar transformed a farmer's life - from traditional struggles to modern digital marketplace success*

---
### 🇮🇳 Hindi Home Page
![Hindi Home Page](assets/hindi%20home%20page.png)
*Full bilingual support - Homepage in Hindi with government schemes and farmer resources*

### 🇬🇧 English Home Page
![English Home Page](assets/eng%20home%20page.png)
*Beautiful landing page showcasing key features: voice input, fair pricing, and direct farmer-buyer connection*

### 👨‍🌾 Farmer Adding Crop
![Farmer Adding Crop](assets/farmer%20adding%20crop.png)
*Voice-enabled crop listing - Farmers speak in Hindi/Hinglish to automatically extract crop details and quantity*

### 📝 Adding Crop to Marketplace
![Adding to Market](assets/adding%20crop%20in%20market%20list.png)
*AI price prediction and quality verification - Real-time freshness scoring with temperature/humidity data*

### 🛒 Buyer Marketplace
![Marketplace](assets/marker%20place.png)
*Browse fresh produce with filters - Search by crop, category, or location with real-time availability*

### 🛍️ Add to Cart
![Add to Cart](assets/add%20to%20cart.png)
*Smart shopping experience - Quantity validation and multi-item cart with live total calculation*

### ✅ Billing & Order Confirmation
![Billing Page](assets/blling%20page.png)
*Order summary with delivery timeline - Instant confirmation and auto-clear cart for seamless checkout*

---

## �📱 Core Features

### 👨‍🌾 Farmer Dashboard
- **Voice Crop Listing**: Speak "mere paas 50 kilo tamatar hai" → Auto-extracts crop & quantity
- **AI Price Prediction**: Instant market price range (₹min - ₹max/kg)
- **Quality Scoring**: IoT temp/humidity based freshness (0-100)
- **Marketplace Publishing**: One-click listing for buyers

### 🛒 Buyer Dashboard  
- **Smart Search**: Filter by crop, category, location
- **Shopping Cart**: Multi-item cart with real-time totals
- **Quantity Validation**: Prevents over-ordering with live checks
- **Quick Checkout**: Streamlined order confirmation

### 🏛️ Government Portal
- PM-KISAN & crop insurance schemes
- Agricultural events & workshops
- Latest policy announcements
- Detailed eligibility & application info

---

## 📁 Project Structure

```
gaon-bazaar/
├── backend/                 # FastAPI Python Backend
│   ├── main.py             # CORS & routes
│   ├── voice.py            # Voice parsing (Hindi/Hinglish)
│   ├── iot.py              # Quality verification
│   ├── price.py            # Price prediction
│   ├── buyer.py            # Buyer APIs
│   └── store.py            # Farmer listings
│
├── frontend/src/
│   ├── i18n/               # 🌐 Translations (en.json, hi.json)
│   ├── components/         # Farmer, Buyer, Cart
│   ├── pages/              # Home, Billing, Details
│   ├── context/            # Auth, Cart state
│   └── styles/             # Theme, CSS
│
└── ml/                     # ML model training
```

---

## 🔌 API Examples

**Voice Input**
```http
POST /api/voice-input
{"text": "mere paas 10 kilo tamatar hai"}

→ {"crop": "tomato", "quantity": 10, "unit": "kg"}
```

**Price Prediction**
```http
POST /api/predict-price
{"crop": "wheat"}

→ {"crop": "wheat", "min_price": 2000, "max_price": 2500, "currency": "INR"}
```

**Quality Check**
```http
POST /api/iot/quality
{"temperature": 22.5, "humidity": 60.0}

→ {"freshness_score": 88, "status": "Fresh", "quality_verified": true}
```

**Get Listings**
```http
GET /api/buyer/listings

→ [{crop, quantity, price_min, price_max, quality_score}, ...]
```

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 18, React Router v7, i18next |
| Backend | FastAPI 0.104, Python 3.12 |
| Voice | Web Speech API |
| State | React Context (Auth, Cart) |
| Styling | CSS3, Responsive Design |

**Supported Crops**: 30+ varieties in English, Hindi, Hinglish  
*Examples*: wheat/gehu, tomato/tamatar, onion/pyaaz, rice/chawal

---

## 🐛 Troubleshooting

**Backend won't start**
```bash
pip install -r requirements.txt --force-reinstall
python --version  # Check 3.8+
```

**Frontend errors**
```bash
rm -r node_modules package-lock.json
npm install --legacy-peer-deps
```

**Voice not working**
- Use Chrome/Edge/Safari (Web Speech API support required)
- Check microphone permissions
- Try `hi-IN` for Hindi
