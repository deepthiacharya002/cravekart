import React from 'react';
import './HeaderNavbar.css';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const HeaderNavbar = ({ onLoginClick }) => {
  const cartState = useCart();
  const { totalItems } = cartState;
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-logo">🍽️ CraveCart</div>
      <nav className="navbar-links">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
        <a
          href="/cart"
          className="cart-link"
          onClick={e => {
            e.preventDefault();
            navigate('/cart');
          }}
        >
          Cart
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </a>
        {user ? (
          <button onClick={logout} className="auth-button">Logout</button>
        ) : (
          <button onClick={onLoginClick} className="auth-button">Login</button>
        )}
      </nav>
    </header>
  );
};

export default HeaderNavbar;
