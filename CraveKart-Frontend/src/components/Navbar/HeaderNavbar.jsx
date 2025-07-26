import React from 'react';
import './HeaderNavbar.css';

const HeaderNavbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-logo">🍽️ CraveCart</div>
      <nav className="navbar-links">
        <a href="/">Home</a>
        <a href="/menu">Menu</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
};

export default HeaderNavbar;
