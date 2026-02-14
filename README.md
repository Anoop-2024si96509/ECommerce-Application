# E-Commerce Application - Full Stack Project

## 📋 Project Overview

A complete full-stack e-commerce application built with modern web technologies. This application allows users to register, browse products, add items to cart, process payments, and view order history.

## ✨ Features Implemented

✅ **Registration Screen** - User account creation with validation
✅ **Login Screen** - Secure user authentication with JWT
✅ **Main Menu/Dashboard** - Product listing with search and category filtering
✅ **Detail Page** - Product information with add-to-cart functionality
✅ **Payment Gateway** - Dummy payment processing system
✅ **Orders Screen** - View order history and details

## 🏗️ Architecture

The application follows a **3-Tier Layered Architecture**:

1. **Presentation Layer** (React Frontend)
2. **Business Logic Layer** (Node.js Backend)
3. **Data Persistence Layer** (SQLite Database)

For detailed architecture documentation, see: `documentation/LOGICAL_ARCHITECTURE.md`

## 🗄️ Database Design

The system uses a well-normalized ER model with the following entities:
- **Users** - User accounts and authentication
- **Products** - Product catalog
- **Orders** - Customer orders
- **OrderItems** - Individual items in orders

For detailed data model, see: `documentation/ER_MODEL.md`

## 📁 Project Structure

```
ECommerceApplication/
│
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   └── utils/           # Utility functions
│   ├── data/                # SQLite database
│   ├── server.js            # Entry point
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── context/         # Context providers
│   │   ├── styles/          # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── README.md
│
└── documentation/
    ├── SYSTEM_DESIGN.md           # Complete system overview
    ├── LOGICAL_ARCHITECTURE.md    # Architecture details
    ├── ER_MODEL.md               # Database design
    └── GETTING_STARTED.md        # Installation guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

**Step 1: Backend Setup**
```bash
cd backend
npm install
npm run dev
```

**Step 2: Frontend Setup** (new terminal)
```bash
cd frontend
npm install
npm start
```

**Step 3: Open Application**
Navigate to: `http://localhost:3000`

For detailed instructions, see: `documentation/GETTING_STARTED.md`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with search/filter)
- `GET /api/products/:id` - Get product details
- `GET /api/products/categories` - Get all categories

### Orders (Protected)
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:orderId` - Get order details

### Payment
- `POST /api/payment/process` - Process payment

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **SQLite3** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- CORS configuration
- Input validation

## 📊 Database Schema

### Users Table
| Column | Type | Notes |
|--------|------|-------|
| id | VARCHAR(36) | Primary Key (UUID) |
| email | VARCHAR(255) | Unique |
| password | VARCHAR(255) | Hashed |
| firstname | VARCHAR(100) | Required |
| lastname | VARCHAR(100) | Required |
| createdAt | TIMESTAMP | Auto-generated |
| updatedAt | TIMESTAMP | Auto-updated |

### Products Table
| Column | Type | Notes |
|--------|------|-------|
| id | VARCHAR(36) | Primary Key |
| name | VARCHAR(255) | Required |
| description | TEXT | Optional |
| price | DECIMAL(10,2) | Required |
| category | VARCHAR(100) | Optional |
| stock | INTEGER | Default: 0 |
| image | VARCHAR(255) | Optional |

### Orders & OrderItems
See `documentation/ER_MODEL.md` for complete schema

## 🔄 User Flow

1. **Register/Login** → User creates account or logs in
2. **Browse** → User sees product dashboard
3. **Search/Filter** → User finds products
4. **View Details** → User sees product information
5. **Add to Cart** → User adds items to cart
6. **Checkout** → User proceeds to payment
7. **Payment** → Payment processing (dummy)
8. **Order Created** → Order stored in database
9. **View Orders** → User can view order history

## 📚 Documentation

- **SYSTEM_DESIGN.md** - Complete system overview and setup
- **LOGICAL_ARCHITECTURE.md** - Architectural layers and design patterns
- **ER_MODEL.md** - Database schema and relationships
- **GETTING_STARTED.md** - Installation and troubleshooting guide
- **backend/README.md** - Backend-specific documentation
- **frontend/README.md** - Frontend-specific documentation

## 🧪 Test Account

After installation, use these credentials:
```
Email: john@example.com
Password: password123
```

Or create a new account through the registration page.

## 📦 Default Products

The system comes pre-seeded with sample products:
- Laptop - $999.99
- Smartphone - $699.99
- Headphones - $199.99
- Tablet - $449.99
- Smart Watch - $299.99
- USB-C Cable - $19.99
- Screen Protector - $12.99
- Phone Case - $24.99

## 🎯 Features Demonstration

### User Registration & Authentication
- Form validation
- Password hashing
- JWT token generation

### Product Browsing
- List all products
- Search by product name/description
- Filter by category
- View product details

### Shopping Cart
- Add/remove items
- Update quantities
- Real-time total calculation
- Persistent storage (localStorage)

### Payment Processing
- Dummy payment gateway (90% success rate)
- Order creation on successful payment
- Cart clearing after purchase

### Order History
- View all user orders
- Order details with items
- Payment status tracking

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy build/ folder to any static hosting (Vercel, Netlify, etc.)
```

### Backend Deployment
```bash
# Deploy to Node.js hosting (Heroku, AWS, DigitalOcean, etc.)
npm install
npm start
```

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Ensure Node.js is installed
- Run `npm install` again

### Frontend won't connect
- Verify backend is running on port 5000
- Check CORS configuration
- Clear browser cache

### Database issues
- Delete `data/ecommerce.db` and restart
- Check database file permissions

See `documentation/GETTING_STARTED.md` for more troubleshooting tips.

## 📞 Support

For issues or questions:
1. Check the documentation folder
2. Review error messages in browser/terminal console
3. Verify all prerequisites are installed

## 📄 License

This project is created for educational purposes as part of MTech coursework.

## 👨‍💼 Project Information

**Course**: Full Stack Application Development  
**Assignment**: E-Commerce Application Design  
**Weightage**: 20%

### Evaluation Criteria
- ✅ Logical Architecture (5%) - Layers identified with clear responsibilities
- ✅ ER Model (Included) - Complete data requirements and relationships
- ✅ Demo Ready (10%) - Fully functional application
- ✅ Documentation (5%) - Clear and comprehensive

---

**Ready to use!** Start with `documentation/GETTING_STARTED.md` to begin.
