# E-Commerce Backend

Node.js + Express backend for the E-Commerce application.

## Installation

```bash
npm install
```

## Environment Setup

Copy `.env.example` to `.env` and update values:

```bash
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
DATABASE_PATH=./data/ecommerce.db
```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with search and category filter)
- `GET /api/products/:id` - Get product details
- `GET /api/products/categories` - Get all categories

### Orders
- `POST /api/orders` - Create order (requires authentication)
- `GET /api/orders` - Get user's orders (requires authentication)
- `GET /api/orders/:orderId` - Get order details (requires authentication)

### Payment
- `POST /api/payment/process` - Process payment
