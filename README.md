# KIVRA - Luxury Fashion E-commerce Platform

A comprehensive, full-stack luxury fashion e-commerce application built with React.js and Node.js, featuring a sophisticated payment gateway, multi-step checkout process, and premium user experience.

![Kivra Logo](https://img.shields.io/badge/KIVRA-Luxury%20Fashion-D4AF37?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA9TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRDRBRjM3Ii8+Cjwvc3ZnPgo=)

## 🏆 Project Overview

KIVRA is a premium e-commerce platform designed for luxury fashion retail, offering:

- **Sophisticated User Interface** with modern animations and responsive design
- **Advanced Payment Gateway** with comprehensive card validation and multiple payment methods
- **Multi-step Checkout Process** with shipping and billing address management
- **User Authentication System** with profile management
- **Shopping Cart** with persistent storage and real-time updates
- **Product Catalog** with categorized collections and detailed product pages

## 🚀 Live Demo

[View Live Application](https://kivra-fashion.netlify.app) *(Replace with your actual deployment URL)*

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse products by categories (Men, Women, Accessories, New Arrivals)
- **Product Details**: Detailed product pages with size/color selection and image galleries
- **Shopping Cart**: Add/remove items, update quantities, persistent cart storage
- **Wishlist**: Save favorite products (Coming Soon)
- **Search**: Advanced product search functionality

### 💳 Payment Gateway
- **Multiple Payment Methods**: Credit/Debit Cards, Amazon Pay
- **Card Validation**: 
  - Real-time card type detection (Visa, Mastercard, Amex, Discover)
  - Luhn algorithm validation for card numbers
  - CVV validation (3/4 digits based on card type)
  - Expiry date validation with future date checking
- **Billing Address**: Option to use shipping or separate billing address
- **Security**: Input sanitization, SSL indicators, secure payment processing

### 🔐 User Management
- **Authentication**: User registration and login with form validation
- **Profile Management**: User profile updates and preferences
- **Order History**: View past orders and order status (Coming Soon)
- **Session Management**: Persistent login with localStorage

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Animations**: Smooth transitions and interactive elements
- **Dark/Light Theme**: Premium color scheme with gold accents
- **Loading States**: Elegant loading animations and feedback
- **Error Handling**: Comprehensive error messages and validation

### 📱 Progressive Web App
- **Offline Support**: Service worker for offline functionality (Coming Soon)
- **App Install**: PWA installation capabilities
- **Push Notifications**: Order updates and promotional notifications (Coming Soon)

## 🛠️ Technology Stack

### Frontend
- **React 19.1.0** - Modern JavaScript library for building user interfaces
- **React Router DOM 7.6.3** - Declarative routing for React applications
- **Tailwind CSS 4.1.11** - Utility-first CSS framework for rapid UI development
- **Context API** - Built-in React state management for global state
- **Axios 1.10.0** - Promise-based HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js 5.1.0** - Web application framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **Mongoose 8.16.1** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Token for authentication
- **bcryptjs** - Password hashing library

### Development Tools
- **React Scripts 5.0.1** - Build tool and development server
- **PostCSS** - CSS post-processor for Tailwind CSS
- **Autoprefixer** - CSS vendor prefixing
- **Nodemon** - Development server with auto-restart

## 📁 Project Structure

```
Kivra/
├── frontend/                 # Frontend React application
│   ├── client/
│   │   ├── public/          # Static assets
│   │   ├── src/
│   │   │   ├── components/  # Reusable React components
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Payment.jsx
│   │   │   │   └── ...
│   │   │   ├── context/     # React Context providers
│   │   │   │   ├── AuthContext.js
│   │   │   │   └── CartContext.js
│   │   │   ├── pages/       # Page components
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── Cart.jsx
│   │   │   │   └── ...
│   │   │   ├── styles/      # CSS files
│   │   │   └── App.js       # Main App component
│   │   └── package.json
│   ├── src/                 # Tailwind CSS source
│   ├── tailwind.config.js   # Tailwind configuration
│   └── package.json         # Frontend dependencies
├── backend/                 # Backend Node.js application
│   ├── server/
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── server.js        # Main server file
│   └── package.json         # Backend dependencies
└── README.md
```

## 🔧 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (v5 or higher)
- **Git**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kivra-fashion.git
   cd kivra-fashion
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment configuration**
   ```bash
   # Create .env file in backend directory
   cp .env.example .env
   
   # Edit .env with your configuration
   MONGO_URI=mongodb://localhost:27017/kivra
   JWT_SECRET=your-super-secret-jwt-key
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB service**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (using Homebrew)
   brew services start mongodb/brew/mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   # Server will run on http://localhost:5000
   ```

### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   
   cd client
   npm install
   ```

2. **Build Tailwind CSS**
   ```bash
   cd ../ # Back to frontend directory
   npm run build-css
   ```

3. **Start the development server**
   ```bash
   npm start
   # Application will run on http://localhost:3000
   ```

### Quick Start (All Services)

```bash
# Install all dependencies
cd backend && npm install && cd ../frontend && npm install && cd client && npm install

# Start all services (run from project root)
cd backend && npm run dev &
cd frontend && npm run dev
```

## 🎯 Usage

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend application** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Build

1. **Build Tailwind CSS for production**
   ```bash
   cd frontend
   npm run build-css-prod
   ```

2. **Build the React application**
   ```bash
   npm run build
   ```

3. **Start the production server**
   ```bash
   cd backend
   npm start
   ```

## 📡 API Documentation

### Authentication Endpoints
```
POST /api/auth/register - User registration
POST /api/auth/login    - User login
GET  /api/auth/profile  - Get user profile
PUT  /api/auth/profile  - Update user profile
```

### Product Endpoints
```
GET    /api/products           - Get all products
GET    /api/products/:id       - Get product by ID
GET    /api/products/category/:category - Get products by category
POST   /api/products           - Create product (Admin)
PUT    /api/products/:id       - Update product (Admin)
DELETE /api/products/:id       - Delete product (Admin)
```

### Cart Endpoints
```
GET    /api/cart              - Get user cart
POST   /api/cart/add          - Add item to cart
PUT    /api/cart/update       - Update cart item
DELETE /api/cart/remove       - Remove item from cart
DELETE /api/cart/clear        - Clear entire cart
```

### Order Endpoints
```
GET    /api/orders            - Get user orders
POST   /api/orders            - Create new order
GET    /api/orders/:id        - Get order by ID
PUT    /api/orders/:id/status - Update order status (Admin)
```

## 🔑 Environment Variables

### Backend (.env)
```env
# Database
MONGO_URI=mongodb://localhost:27017/kivra
MONGO_TEST_URI=mongodb://localhost:27017/kivra_test

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Server
PORT=5000
NODE_ENV=development

# Payment Gateway (when integrating real payments)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Email Service (for notifications)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# File Upload (for product images)
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
```

### Frontend (.env)
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_PAYMENT_GATEWAY_URL=https://api.paymentgateway.com

# Analytics
REACT_APP_GOOGLE_ANALYTICS_ID=your-ga-id
REACT_APP_FACEBOOK_PIXEL_ID=your-pixel-id

# Feature Flags
REACT_APP_ENABLE_PWA=true
REACT_APP_ENABLE_NOTIFICATIONS=true
```

## 🚀 Deployment

### Frontend (Netlify)

1. **Build the application**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login and deploy
   netlify login
   netlify deploy --prod --dir=client/build
   ```

### Backend (Heroku)

1. **Create Heroku app**
   ```bash
   heroku create kivra-api
   ```

2. **Set environment variables**
   ```bash
   heroku config:set MONGO_URI=your-mongodb-atlas-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   ```

3. **Deploy to Heroku**
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Full Stack (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy with Vercel**
   ```bash
   vercel --prod
   ```

## 🧪 Testing

### Run Tests
```bash
# Frontend tests
cd frontend/client
npm test

# Backend tests
cd backend
npm test

# E2E tests
npm run test:e2e
```

### Test Coverage
```bash
# Generate coverage report
npm run test:coverage
```

## 🔄 Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/new-feature-name
   ```

2. **Make your changes and commit**
   ```bash
   git add .
   git commit -m "Add new feature: description"
   ```

3. **Push and create pull request**
   ```bash
   git push origin feature/new-feature-name
   ```

## 📈 Performance Optimization

- **Code Splitting**: Lazy loading for route components
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Webpack bundle analyzer for optimization
- **Caching**: Service worker for static asset caching
- **CDN**: Content delivery network for global performance

## 🔒 Security Features

- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Parameterized queries with Mongoose
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: CSRF tokens for state-changing operations
- **Rate Limiting**: API rate limiting to prevent abuse
- **HTTPS**: SSL/TLS encryption for data in transit

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: Your Name - [GitHub](https://github.com/yourusername)
- **Frontend Developer**: Developer Name - [GitHub](https://github.com/developer)
- **Backend Developer**: Developer Name - [GitHub](https://github.com/developer)
- **UI/UX Designer**: Designer Name - [Portfolio](https://portfolio.com)

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/kivra-fashion/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/kivra-fashion/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/kivra-fashion/discussions)
- **Email**: support@kivra.com

## 🙏 Acknowledgments

- **Design Inspiration**: Luxury fashion brands and modern e-commerce platforms
- **Icons**: Font Awesome and custom SVG icons
- **Images**: Unsplash for high-quality product photography
- **Libraries**: All the amazing open-source libraries that made this possible

## 📊 Project Status

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Last Commit](https://img.shields.io/github/last-commit/yourusername/kivra-fashion)

---

**KIVRA** - *Where Luxury Meets Technology* ✨
