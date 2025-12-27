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

## 🚀 Quick Start

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

## 📱 Core Features

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

---

## 📈 Roadmap

**Current** ✅
- Voice input, AI pricing, quality check
- Cart & checkout flow
- Bilingual UI (EN/HI)
- Government portal

**Next** 🚧
- [ ] PostgreSQL/Supabase database
- [ ] JWT authentication
- [ ] Payment gateway (Razorpay)
- [ ] Real ML price model

**Future** 🔮
- [ ] Mobile app (React Native)
- [ ] Real-time APMC prices
- [ ] Order tracking & notifications

---

## 📄 License

MIT License - see LICENSE for details

---

**Last Updated**: December 2025 | **Status**: Active Development
    "price_min": 2000,
    "price_max": 2500,
    "quality_score": 85,
    "farmer_id": "farmer_001"
  }
]
```

### Add Listing (Farmer)
    "price_max": 2500,
    "quality_score": 85,
    "farmer_id": "farmer_001"
  }
]
```
