# Gaon Bazar Frontend

A farmer-friendly React web application with nature-inspired UI theme.

## Features

- **Farmer Dashboard** 👨‍🌾
  - Voice input for produce details (Hindi/English)
  - AI-based fair price prediction
  - IoT quality verification
  - Easy marketplace listing

- **Buyer Dashboard** 🛒
  - Browse farmer listings
  - View AI-predicted fair prices
  - Quality verification badges
  - Direct order confirmation

## Design Theme

- **Colors**: Soft green (#2ecc71), light yellow, sky blue
- **Feel**: Nature, agriculture, trust
- **Typography**: Big, rounded, readable fonts
- **Decorations**: Light nature elements (grass, trees, leaves)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Running the App

```bash
npm start
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## API Integration

The frontend connects to the backend API at `http://127.0.0.1:8000/api`

### Endpoints Used

- `POST /api/voice-input` - Process farmer voice input
- `POST /api/predict-price` - Get AI price prediction
- `GET /api/iot/quality` - Get quality verification data
- `POST /api/farmer/add-listing` - Add farmer listing
- `GET /api/buyer/listings` - Get all listings
- `POST /api/buyer/order` - Confirm order

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Farmer.js
│   │   ├── Farmer.css
│   │   ├── Buyer.js
│   │   └── Buyer.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Styling

The app uses a custom CSS theme with:
- CSS variables for colors and spacing
- Mobile-responsive design
- Smooth animations and transitions
- Nature-inspired gradients

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
