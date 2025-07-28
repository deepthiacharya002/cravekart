import React from 'react';
import './HeaderNavbar.css';
import { useCart } from '../../context/CartContext';
import { useNavigate } from "react-router-dom";

const HeaderNavbar = () => {
  const cartState = useCart();
  const { totalItems } = cartState;
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-logo">🍽️ CraveCart</div>
      <nav className="navbar-links">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
        <a href="/favorites" onClick={(e) => { e.preventDefault(); navigate('/favorites'); }}>
          Favorites
        </a>
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
      </nav>
    </header>
  );
};

export default HeaderNavbar;
