# E-Commerce Application - Complete Setup & Deployment Guide

## 📦 Project Delivery Package Contents

This complete e-commerce application includes:

### ✅ Backend (Node.js + Express)
- REST API with 4 major modules
- SQLite database with proper schema
- JWT authentication
- 15+ source files
- Complete error handling

### ✅ Frontend (React)
- 7 fully functional pages
- Context API state management
- Responsive design
- 18+ source files
- Professional UI/UX

### ✅ Documentation (5 Documents)
- System design overview
- Logical architecture with diagrams
- ER model with database schema
- Getting started guide
- This complete guide

---

## 🚀 Installation (5 Minutes)

### Prerequisites Check
```bash
# Verify Node.js is installed
node --version      # Should be v14 or higher
npm --version       # Should be v6 or higher
```

If not installed:
- Download from https://nodejs.org/
- Install LTS version
- Restart terminal after installation

### Backend Installation

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# The installation will take 1-2 minutes
# You should see: added XXX packages

# Verify installation
npm list express    # Should show version 4.18.2
```

### Frontend Installation

```bash
# Open new terminal/tab
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# The installation will take 2-3 minutes
# You should see: added XXX packages

# Verify installation
npm list react      # Should show version 18.2.0
```

---

## 🔧 Configuration

### Backend Configuration

```bash
cd backend

# Copy example env file
cp .env.example .env

# Edit .env file (optional - defaults work fine)
# PORT=5000
# JWT_SECRET=your_jwt_secret_key_here
# DATABASE_PATH=./data/ecommerce.db
```

### Frontend Configuration

Frontend automatically connects to backend at `http://localhost:5000`

If backend runs on different port:
- Edit `frontend/src/services/api.js`
- Change `API_BASE_URL` value

---

## ▶️ Running the Application

### Terminal 1 - Start Backend

```bash
cd backend
npm run dev

# Expected output:
# [nodemon] restarting due to changes...
# Server running on port 5000
```

✓ Backend is now ready

### Terminal 2 - Start Frontend

```bash
cd frontend
npm start

# Expected output will show:
# Compiled successfully!
# You can now view ecommerce-frontend in the browser.
# Local: http://localhost:3000
```

✓ Application automatically opens at http://localhost:3000

---

## 🧪 Testing the Application

### Step 1: Register New User

1. On login page, click "Register here"
2. Fill in the form:
   ```
   First Name: John
   Last Name: Doe
   Email: john@example.com
   Password: password123
   ```
3. Click "Register"
4. Success message appears
5. Click "Login here" and use same email/password

### Step 2: Test Dashboard

1. After login, see all products
2. Try search: Type "laptop" in search box
3. Try filter: Select "Electronics" from category dropdown
4. Click "View Details" on any product

### Step 3: Test Shopping

1. On product detail page:
   - Change quantity to 2
   - Click "Add to Cart"
   - Success notification appears
2. Click "Cart" in navigation
3. See cart items with total
4. Update quantities
5. Try "Remove" button

### Step 4: Test Checkout

1. Click "Proceed to Checkout"
2. Fill payment form:
   ```
   Cardholder Name: Test User
   Card Number: 1234 5678 9012 3456
   Expiry Date: 12/25
   CVV: 123
   ```
3. Click "Pay $[amount]"
4. Payment processes
5. Success message "Payment successful!"
6. Automatically redirected to orders

### Step 5: Test Orders

1. On orders page:
   - See all your orders
   - Click any order to see details
   - View items, status, total amount

---

## 📊 Database Verification

### Check if Database is Created

```bash
# Backend directory
cd backend

# List files in data folder
ls data/

# Should show: ecommerce.db

# If not created, it will be created on first server start
```

### View Database Contents (Optional)

```bash
# Install SQLite CLI (one-time only)
npm install -g sqlite3

# Open database
sqlite3 data/ecommerce.db

# View tables
.tables

# Example queries:
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM orders;

# Exit
.quit
```

---

## 📁 Important File Locations

### Backend Files

```
backend/
├── server.js                        # Main entry point
├── package.json                     # Dependencies
├── .env                             # Configuration
└── src/
    ├── config/database.js           # Database & seeding
    ├── controllers/
    │   ├── authController.js        # User auth logic
    │   ├── productController.js     # Product logic
    │   ├── orderController.js       # Order logic
    │   └── paymentController.js     # Payment logic
    ├── middleware/auth.js           # JWT verification
    └── routes/
        ├── authRoutes.js            # Auth endpoints
        ├── productRoutes.js         # Product endpoints
        ├── orderRoutes.js           # Order endpoints
        └── paymentRoutes.js         # Payment endpoints
```

### Frontend Files

```
frontend/
├── package.json                     # Dependencies
├── public/index.html                # HTML entry point
└── src/
    ├── index.js                     # React entry point
    ├── App.js                       # Main component
    ├── pages/
    │   ├── RegisterPage.js          # Registration UI
    │   ├── LoginPage.js             # Login UI
    │   ├── DashboardPage.js         # Product listing
    │   ├── ProductDetailPage.js     # Product details
    │   ├── CartPage.js              # Shopping cart
    │   ├── PaymentPage.js           # Payment form
    │   └── OrdersPage.js            # Order history
    ├── components/Navbar.js         # Navigation
    ├── services/api.js              # API client
    └── context/
        ├── AuthContext.js           # Auth state
        └── CartContext.js           # Cart state
```

### Documentation Files

```
documentation/
├── SYSTEM_DESIGN.md                 # Complete system overview
├── LOGICAL_ARCHITECTURE.md          # Architecture details
├── ER_MODEL.md                      # Database schema
└── GETTING_STARTED.md               # Installation guide

Root:
├── README.md                        # Project overview
├── PROJECT_SUMMARY.md               # What was created
├── QUICK_REFERENCE.md               # Quick reference guide
└── SETUP_GUIDE.md                   # This file
```

---

## 🔍 Verifying Installation

### Checklist

- [ ] Node.js installed (version check passed)
- [ ] Backend npm packages installed
- [ ] Frontend npm packages installed
- [ ] Backend server running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can open http://localhost:3000
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Products visible on dashboard
- [ ] Database created at `backend/data/ecommerce.db`

---

## 🐛 Troubleshooting Common Issues

### Issue: "Port 5000 already in use"

**Solution 1: Change the port**
```bash
# Edit backend/.env
PORT=5001

# Restart backend
npm run dev
```

**Solution 2: Kill process using port 5000**
```bash
# On Windows (PowerShell)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: "Port 3000 already in use"

```bash
# Run on different port
PORT=3001 npm start
```

### Issue: "Cannot find module 'express'"

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "ECONNREFUSED - Cannot connect to backend"

```bash
# Ensure backend is running
# Check backend terminal for error messages
# Verify backend is on http://localhost:5000
# Check frontend src/services/api.js for correct URL
```

### Issue: "CORS error" or "Request blocked"

```bash
# Backend CORS is configured in server.js
# Make sure backend is running
# Restart both backend and frontend
```

### Issue: "Database error"

```bash
# Delete old database and restart
cd backend
rm data/ecommerce.db
npm run dev
# Database will be recreated automatically
```

### Issue: "Cannot register - email already exists"

```bash
# Use different email address
# Or delete database and recreate:
rm backend/data/ecommerce.db
# Restart backend
```

---

## 🔐 Security Notes

### Password Hashing
- Passwords are hashed with bcrypt (10 rounds)
- Never stored as plain text
- Safe for production use

### Authentication
- JWT tokens expire after 24 hours
- Token stored in browser localStorage
- Refreshing clears token (logout on page refresh)

### API Protection
- Protected routes require valid JWT token
- Order endpoints check user ID
- Invalid tokens rejected

---

## 📈 Performance Tips

1. **Clear Browser Cache**
   - Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
   - Clear cache and cookies
   - Reload page

2. **Check Network**
   - Open DevTools (F12)
   - Go to Network tab
   - Check all requests complete successfully

3. **Monitor Console**
   - Open DevTools (F12)
   - Go to Console tab
   - Check for errors

4. **Database Optimization**
   - First load may be slower (seeding products)
   - Subsequent loads are fast

---

## 🚀 Production Deployment

### Frontend Deployment

```bash
# Create production build
cd frontend
npm run build

# Deploy 'build' folder to:
# - Vercel (recommended)
# - Netlify
# - AWS S3 + CloudFront
# - Any static hosting
```

### Backend Deployment

Deploy to:
- Heroku (free tier available)
- AWS EC2
- DigitalOcean
- Railway.app
- Replit

Before deployment:
```bash
# Update JWT_SECRET in .env
JWT_SECRET=very_strong_secret_key

# Update backend URL in frontend
# Edit src/services/api.js
API_BASE_URL=https://your-backend.com/api
```

---

## 📞 Support Resources

### Documentation
- **GETTING_STARTED.md** - Detailed setup guide
- **LOGICAL_ARCHITECTURE.md** - System design
- **ER_MODEL.md** - Database schema
- **README.md** - Project overview

### API Reference
- **backend/README.md** - API endpoints
- **frontend/README.md** - Frontend setup

### Code Comments
- All functions are documented
- Check inline comments for details

---

## ✅ Final Verification

Before proceeding with project submission:

1. **Backend works**
   - [ ] npm install succeeded
   - [ ] npm run dev starts without errors
   - [ ] Server shows "running on port 5000"

2. **Frontend works**
   - [ ] npm install succeeded
   - [ ] npm start opens browser
   - [ ] No console errors

3. **Database works**
   - [ ] Database file created
   - [ ] Products visible after login
   - [ ] Can create orders

4. **Features work**
   - [ ] Registration complete
   - [ ] Login works
   - [ ] Products display
   - [ ] Search/filter work
   - [ ] Add to cart works
   - [ ] Checkout works
   - [ ] Payment processes
   - [ ] Orders saved

5. **Documentation**
   - [ ] README.md present and clear
   - [ ] Logical architecture documented
   - [ ] ER model documented
   - [ ] Setup guide available
   - [ ] API documented

---

## 🎉 You're Ready!

The e-commerce application is fully set up and ready to use.

**Next Steps**:
1. Start backend: `npm run dev` in backend folder
2. Start frontend: `npm start` in frontend folder
3. Open http://localhost:3000
4. Register and test the application
5. Review the documentation
6. Customize as needed

**Enjoy your e-commerce application!** 🚀

---

**Setup Completed**: ✓ Ready for Development
**All Features**: ✓ Working
**Documentation**: ✓ Complete
**Database**: ✓ Configured
**Status**: ✓ Ready for Demo & Deployment
