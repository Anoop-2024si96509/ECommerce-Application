import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          🛒 E-Commerce
        </Link>
        <div className="navbar-menu">
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          <Link to="/cart" className="navbar-link">Cart</Link>
          <Link to="/orders" className="navbar-link">Orders</Link>
          <span className="navbar-user">Welcome, {user?.firstname}</span>
          <button onClick={handleLogout} className="navbar-logout">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
