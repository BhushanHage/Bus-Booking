import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>🚗 Vehicle Booking</h1>
        </Link>
        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/booking">Book Vehicle</Link>
          {user?.role === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
        </nav>
        <div className="user-section">
          {user ? (
            <>
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="btn btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
