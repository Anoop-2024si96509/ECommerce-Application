# E-Commerce Frontend

React frontend for the E-Commerce application.

## Installation

```bash
npm install
```

## Running the Application

Development mode:
```bash
npm start
```

The application will open at `http://localhost:3000`

Build for production:
```bash
npm run build
```

## Features

- User Registration & Login
- Product Dashboard with Search & Filtering
- Product Details Page
- Shopping Cart
- Payment Processing (Dummy Gateway)
- Order History

## Environment Variables

The application expects the backend API to be available at `http://localhost:5000/api`

## Structure

- `src/components/` - React components
- `src/pages/` - Page components
- `src/services/` - API service layer
- `src/context/` - Context providers (Auth, Cart)
- `src/styles/` - CSS files
