# 🌾 Gaon Bazar - Empowering Farmers, Connecting Markets

**A modern agricultural marketplace platform connecting farmers directly with buyers, featuring government support portal, voice-enabled crop listing, AI price prediction, IoT quality verification, and seamless cart checkout experience.**

> Farmer-to-Buyer Marketplace • Government Schemes Portal • Voice Input • Quality Verification • Smart Pricing

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.8+-blue)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.68+-green)](https://fastapi.tiangolo.com/)
[![Status](https://img.shields.io/badge/Status-Production--Ready-success)](#-quick-start)

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** with pip
- **Node.js 14+** with npm
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Backend Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Server runs on **http://localhost:8000**  
API docs available at **http://localhost:8000/docs**

### Frontend Setup (React)
```bash
cd frontend
npm install
npm start
```
App runs on **http://localhost:3000**

### Access the Application
Open **http://localhost:3000** in your browser and explore!

---

## 📱 Application Pages & Features

### 🏠 Home Page (`/`)
**Government Support & Information Portal**
- Hero section with platform overview
- Featured government schemes and subsidies
- Upcoming agricultural events and workshops
- Latest announcements and policy updates
- Quick access to farmer/buyer dashboards

### 👨‍🌾 Farmer Dashboard (`/farmer`)
**Complete Crop Management System**

#### Features:
- **📋 All Listings Tab**: View all your published crops with status
- **📊 Analytics Tab**: Sales insights and performance metrics (coming soon)
- **➕ Add Crop Tab**: List new crops with advanced features

#### Adding Crops:
1. **🎤 Voice Input** (Hindi/Hinglish supported)
   - Click microphone button
   - Speak naturally: "mere pass 10 kilo tamatar hai"
   - Auto-extracts crop type and quantity
   - Supports 30+ crop names and variations

2. **💰 AI Price Prediction**
   - Instant market price suggestions
   - Min-max price range display
   - Real-time pricing recommendations

3. **🌡️ IoT Quality Verification**
   - Temperature and humidity-based scoring
   - Freshness rating (0-100 scale)
   - Quality badges: Fresh/Good/Fair
   - Automatic verification status

4. **✅ Publish Listing**
   - One-click to marketplace
   - Visible to all buyers instantly

### 🛒 Buyer Dashboard (`/buyer`)
**Modern Shopping Experience**

#### Features:
- **🛍️ Marketplace Tab**: Browse all available crops
- **📈 Market Analytics Tab**: Price trends and insights (coming soon)
- **📋 My Orders Tab**: Order history and tracking

#### Shopping Experience:
1. **Search & Filter**
   - 🔍 Search by crop name
   - 📂 Filter by category
   - 📍 Filter by location

2. **Product Cards**
   - Beautiful product displays
   - Price range (₹min - ₹max/kg)
   - Quality verification badges
   - Seller location and ratings
   - Available quantity display

3. **🛒 Cart & Checkout**
   - Add multiple items to cart
   - View cart summary with totals
   - Adjust quantities or remove items
   - One-click checkout process

4. **✅ Order Confirmation**
   - Order summary page
   - Delivery timeline (2-3 days)
   - Automatic cart clearing
   - Return to marketplace

### 📚 Information Pages

#### `/schemes` - Government Schemes
- PM-KISAN direct benefit transfer
- Crop insurance programs
- Minimum Support Price (MSP)
- Agricultural loans and subsidies
- Detailed eligibility criteria
- Application procedures

#### `/events` - Market Insights & Events
- Upcoming agricultural workshops
- Training sessions and webinars
- Market awareness programs
- Event registration
- Speaker information
- Dates and locations

### 🎨 Design System
**Unified Theme Across All Pages**
- Consistent dark green brand identity
- Gold/yellow accent colors
- Responsive card-based layouts
- Smooth animations and transitions
- Mobile-first responsive design
- Accessible color contrast

---

## ✨ Advanced Features

### 🎙️ Voice Recognition Technology
- **Browser-based Speech Recognition API**
- Hindi and Hinglish language support
- Real-time transcription
- Intelligent crop name extraction
- Quantity parsing (kg, quintal, ton)
- 30+ crop variations recognized
- Visual feedback during recording
- Auto-stop on silence

### 🤖 AI Price Intelligence
- Market price prediction algorithm
- Regional price variation support
- Seasonal pricing adjustments
- Quality-based price recommendations
- Mock API with realistic data
- Integration-ready for live APIs

### 🌡️ IoT Quality Verification
- Temperature sensor integration
- Humidity monitoring
- Freshness score calculation (0-100)
- Storage condition compliance
- Automatic quality grading
- Buyer confidence building

### 🛒 E-commerce Functionality
- **Global Cart Context** with React Context API
- Persistent cart state across navigation
- Add/Remove items dynamically
- Real-time total calculation
- Smooth modal animations
- Checkout flow with order confirmation
- Post-purchase cart clearing

### 🎯 Role-Based Navigation
- Seamless role switching (Farmer ↔ Buyer)
- Context-aware navbar
- Role-specific page access
- Persistent role selection
- Clean URL routing

---

## 📁 Project Structure

```
gaon-bazaar/
├── backend/                      # FastAPI Python Backend
│   ├── main.py                  # Main app with CORS & route registration
│   ├── voice.py                 # Voice input parsing (Hindi/Hinglish)
│   ├── iot.py                   # IoT quality verification
│   ├── price.py                 # Price prediction API
│   ├── buyer.py                 # Buyer listings & orders
│   ├── store.py                 # Farmer crop storage
│   ├── models.py                # Pydantic data models
│   └── requirements.txt         # Python dependencies
│
├── frontend/                     # React 18 Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js               # Main router, navbar, footer
│   │   ├── App.css              # Navbar & app shell styles
│   │   ├── index.js             # Entry point with providers
│   │   ├── index.css            # Global styles + theme import
│   │   │
│   │   ├── components/
│   │   │   ├── Farmer.js        # Farmer dashboard (3 tabs)
│   │   │   ├── Farmer.css       # Farmer styles
│   │   │   ├── Buyer.js         # Buyer dashboard (3 tabs + cart)
│   │   │   ├── Buyer.css        # Buyer styles
│   │   │   ├── CartModal.js     # Shopping cart modal
│   │   │   ├── CartModal.css    # Cart modal styles
│   │   │   ├── Header.js        # (Legacy component)
│   │   │   ├── HeroSection.jsx  # Homepage hero
│   │   │   ├── EventsSection.jsx
│   │   │   ├── SchemesSection.jsx
│   │   │   ├── SubsidySection.jsx
│   │   │   └── NoticesBoard.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.js   # Role management context
│   │   │   └── CartContext.js   # Shopping cart context
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx     # Landing page
│   │   │   ├── SchemesDetailPage.jsx
│   │   │   ├── EventsDetailPage.jsx
│   │   │   ├── BillingPage.jsx  # Order confirmation
│   │   │   ├── BillingPage.css  # Billing styles
│   │   │   └── [other detail pages]
│   │   │
│   │   ├── styles/
│   │   │   ├── theme.css        # 🎨 Design system tokens
│   │   │   ├── HomePage.css
│   │   │   ├── DetailPages.css
│   │   │   ├── EventsSection.css
│   │   │   ├── SchemesSection.css
│   │   │   ├── SubsidySection.css
│   │   │   ├── NoticesBoard.css
│   │   │   └── HeroSection.css
│   │   │
│   │   ├── api.js               # Axios API client
│   │   └── supabaseClient.js    # (Optional) Supabase config
│   │
│   └── package.json
│
├── ml/
│   └── train_model.py           # ML model training
│
├── data/
│   ├── prices.csv               # Sample pricing data
│   └── LICENSE.txt
│
├── test_api.py                  # API testing script
├── PROJECT_STATUS.txt           # (Legacy) Project notes
└── README.md                    # This file
```

---

## 🔌 API Endpoints

### Voice Input Parsing
```http
POST /api/voice-input
Content-Type: application/json

{
  "text": "mere pass 10 kilo tamatar hai"
}

Response:
{
  "crop": "tomato",
  "quantity": 10,
  "unit": "kg",
  "original_text": "mere pass 10 kilo tamatar hai"
}
```

### Price Prediction
```http
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
  "predicted_price": 2250,
  "currency": "INR",
  "unit": "quintal"
}
```

### IoT Quality Verification
```http
POST /api/iot/quality
Content-Type: application/json

{
  "temperature": 22.5,
  "humidity": 60.0
}

Response:
{
  "freshness_score": 88,
  "status": "Fresh",
  "temperature": 22.5,
  "humidity": 60.0,
  "quality_verified": true
}
```

### Farmer Listing Management
```http
POST /api/farmer/add-listing
Content-Type: application/json

{
  "crop": "wheat",
  "quantity": 50,
  "location": "Punjab",
  "quality_verified": true
}
```

### Buyer Marketplace
```http
GET /api/buyer/listings
→ Returns all available crop listings

POST /api/buyer/order?crop=wheat&quantity=10
→ Creates order for specified crop
```

---

## 🎯 User Flows

### 🌾 Farmer Flow
1. **Enter Application**
   - Visit http://localhost:3000
   - Click "👨‍🌾 Enter as Farmer" button
   
2. **Add Crop (Voice)**
   - Navigate to "Add Crop" tab
   - Click 🎤 microphone button
   - Speak: "mere pass 20 kilo tamatar hai"
   - System extracts: Tomato, 20kg
   
3. **Get Price Prediction**
   - System automatically fetches market price
   - Displays: ₹1500 - ₹1800/quintal
   
4. **Quality Verification**
   - Enter temperature: 22°C
   - Enter humidity: 60%
   - System calculates freshness: 88/100
   - Status: "Fresh"
   
5. **Publish Listing**
   - Click "Add to Marketplace"
   - Listing appears in "All Listings" tab
   - Visible to all buyers immediately

### 🛒 Buyer Flow
1. **Enter Marketplace**
   - Visit http://localhost:3000
   - Click "🛒 Enter as Buyer" button
   
2. **Browse Products**
   - View all farmer listings
   - Use search bar to find specific crops
   - Filter by category or location
   - See price ranges and quality scores
   
3. **Add to Cart**
   - Click "🛒 Add to Cart" on desired products
   - Items added to global cart
   - Cart count updates in header
   
4. **View Cart**
   - Click "View Cart" button
   - See all items with quantities and prices
   - Remove items if needed
   - View total amount
   
5. **Checkout**
   - Click "Confirm Order"
   - Redirected to billing page
   - See order summary
   - Delivery timeline displayed
   - Cart cleared after confirmation
   - Click "Back to Market" to continue shopping

### 📚 Government Portal Flow
1. **Homepage**
   - View hero section
   - Explore 4 main information cards
   
2. **Detail Pages**
   - Click "Learn More" on any card
   - View comprehensive information
   - Government schemes with eligibility
   - Upcoming events with registration
   
3. **Return to Home**
   - Click "Home" in navbar
   - Or use browser back button

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

## � Supported Crops (30+)

**Grains**: Wheat (gehu/gehun), Rice (chawal), Maize (makka)  
**Vegetables**: Tomato (tamatar), Onion (pyaaz), Potato (aalu), Carrot (gajar), Cabbage, Cauliflower, Brinjal, Cucumber, Chilli, Garlic  
**Fruits**: Mango (aam), Banana (kela), Apple (seb), Orange (santra)  
**Others**: Cotton (kapas), Sugarcane (ganna)

Works in **English, Hindi, and Hinglish**

---

## 🎨 Design System

The project uses a unified CSS design system with:

- **Color Palette**: Dark green brand (#0a2318 - #dcfce7) with gold accents (#f1c40f)
- **Typography Scale**: 14 sizes (xs to 5xl) using Poppins font
- **Spacing System**: 20-step scale (0.25rem to 20rem)
- **Reusable Components**: Buttons, cards, badges, tabs, form inputs
- **CSS Variables**: Easy theme customization

All components use consistent spacing, colors, and typography from [theme.css](frontend/src/styles/theme.css)

---

## 📝 Project Status

### ✅ Completed Features
- [x] Government information portal with schemes, events, announcements
- [x] Farmer dashboard with 3 tabs (Listings, Analytics, Add Crop)
- [x] Buyer dashboard with 3 tabs (Marketplace, Analytics, Orders)
- [x] Voice input parsing (Hindi/Hinglish, 30+ crops)
- [x] AI price prediction API
- [x] IoT quality verification system
- [x] Shopping cart with global state management
- [x] Cart modal (add/remove items, view totals)
- [x] Complete checkout flow
- [x] Order confirmation page with auto-redirect
- [x] Role-based navigation (Farmer/Buyer)
- [x] Responsive mobile-first design
- [x] Unified design system with CSS variables
- [x] Beautiful card-based UI across all pages
- [x] Single-line navbar with conditional menu items

### 🚧 In Progress
- [ ] PostgreSQL/Supabase database integration
- [ ] Real machine learning price prediction model
- [ ] User authentication with JWT tokens
- [ ] Payment gateway integration (Razorpay/Stripe)

### 🔮 Future Enhancements
- [ ] Real-time APMC market price feeds
- [ ] Admin dashboard for market monitoring
- [ ] Mobile app (React Native)
- [ ] SMS/WhatsApp notifications
- [ ] Multi-language UI support
- [ ] Advanced analytics with charts
- [ ] Order tracking and delivery management
- [ ] Rating and review system
- [ ] Blockchain-based transaction verification

---

## 📝 Development Notes

- **No Authentication:** Current version uses role picker; ready for JWT integration
- **In-Memory Storage:** Listings stored in Python dictionaries; DB migration ready
- **Voice API:** Browser's native Web Speech Recognition (no external dependencies)
- **Mock Data:** Price prediction uses mock API; ready for ML model
- **Responsive:** Mobile-first CSS with breakpoints for tablet/desktop
- **Development Mode:** Hot-reload enabled for both React and FastAPI

---

## 📈 Roadmap

### Phase 1 (Completed ✅)
- Core marketplace functionality
- Voice input system
- Cart and checkout flow
- Government portal
- Design system

### Phase 2 (Current)
- Database persistence
- User authentication
- Payment integration
- ML price model

### Phase 3 (Future)
- Real-time market data
- Mobile application
- Advanced analytics
- Notification system

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/yourusername/gaon-bazaar
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update README for new features
   - Test thoroughly before committing

4. **Commit Changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open Pull Request**
   - Provide clear description
   - Link related issues
   - Request code review

### Development Guidelines
- Use CSS variables from `theme.css` for styling
- Follow React Hooks best practices
- Write clean, documented API endpoints
- Test voice input with multiple crop variations
- Ensure mobile responsiveness

---

## 📄 License

**MIT License** - Copyright (c) 2025 Gaon Bazar

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 🙏 Acknowledgments

- **Web Speech API** for voice recognition capabilities
- **FastAPI** for powerful Python backend framework
- **React** for modern, efficient UI development
- **Google Fonts** for Poppins typography
- **Indian Agricultural Portals** for scheme and crop data
- **Open Source Community** for inspiration and tools

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/gaon-bazaar/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/gaon-bazaar/discussions)
- **Email**: support@gaonbazar.com (placeholder)

---

**Built with ❤️ for Indian Farmers**

**Last Updated**: December 26, 2024  
**Version**: 1.0.0  
**Status**: Production Ready  
**Live Demo**: http://localhost:3000  
**API Docs**: http://localhost:8000/docs

---

*Empowering farmers through technology, one marketplace at a time.*
