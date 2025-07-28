import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useCartDispatch } from '../../context/CartContext';
import { cartHelpers } from '../../context/cartHelpers';
import './ContextMenu.css';

const ContextMenu = ({ isVisible, position, onClose, targetItem }) => {
  const navigate = useNavigate();
  const cartState = useCart();
  const dispatch = useCartDispatch();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, onClose]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isVisible, onClose]);

  if (!isVisible || !targetItem) return null;

  const isInCart = cartState.cartItems.some(item => item.name === targetItem.name);
  const isFavorite = cartState.favoriteItems.some(item => item.name === targetItem.name);
  const cartItem = cartState.cartItems.find(item => item.name === targetItem.name);

  const handleAddToCart = () => {
    cartHelpers.addToCart(dispatch, targetItem, 1);
    onClose();
  };

  const handleRemoveFromCart = () => {
    cartHelpers.removeFromCart(dispatch, targetItem.name);
    onClose();
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      cartHelpers.removeFromFavorites(dispatch, targetItem.name);
    } else {
      cartHelpers.addToFavorites(dispatch, targetItem);
    }
    onClose();
  };

  const handleViewDetails = () => {
    // Create a modal or navigate to details page
    console.log('View details for:', targetItem);
    onClose();
  };

  const handleQuickOrder = () => {
    cartHelpers.addToCart(dispatch, targetItem, 1);
    navigate('/cart');
    onClose();
  };

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      cartHelpers.updateQuantity(dispatch, targetItem.name, cartItem.quantity + 1);
    }
    onClose();
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      cartHelpers.updateQuantity(dispatch, targetItem.name, cartItem.quantity - 1);
    } else if (cartItem) {
      cartHelpers.removeFromCart(dispatch, targetItem.name);
    }
    onClose();
  };

  const menuItems = [
    {
      label: 'View Details',
      icon: '👁️',
      action: handleViewDetails,
      show: true
    },
    {
      label: isInCart ? 'Remove from Cart' : 'Add to Cart',
      icon: isInCart ? '🗑️' : '🛒',
      action: isInCart ? handleRemoveFromCart : handleAddToCart,
      show: true
    },
    {
      label: 'Quick Order',
      icon: '⚡',
      action: handleQuickOrder,
      show: !isInCart
    },
    {
      label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
      icon: isFavorite ? '💔' : '❤️',
      action: handleToggleFavorite,
      show: true
    },
    {
      label: 'Increase Quantity',
      icon: '➕',
      action: handleIncreaseQuantity,
      show: isInCart
    },
    {
      label: 'Decrease Quantity',
      icon: '➖',
      action: handleDecreaseQuantity,
      show: isInCart && cartItem?.quantity > 1
    }
  ];

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{
        left: position.x,
        top: position.y,
        position: 'fixed',
        zIndex: 1000
      }}
    >
      <div className="context-menu-header">
        <img
          src={targetItem.image || '/images/placeholder.jpg'}
          alt={targetItem.name}
          className="context-menu-image"
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg';
          }}
        />
        <div className="context-menu-info">
          <h4>{targetItem.name}</h4>
          <p>${targetItem.price?.toFixed(2)}</p>
          {isInCart && (
            <span className="context-menu-badge">
              In Cart: {cartItem?.quantity}
            </span>
          )}
        </div>
      </div>
      
      <div className="context-menu-divider"></div>
      
      <ul className="context-menu-list">
        {menuItems
          .filter(item => item.show)
          .map((item, index) => (
            <li
              key={index}
              className="context-menu-item"
              onClick={item.action}
            >
              <span className="context-menu-icon">{item.icon}</span>
              <span className="context-menu-label">{item.label}</span>
            </li>
          ))}
      </ul>
      
      <div className="context-menu-divider"></div>
      
      <div className="context-menu-footer">
        <small>Right-click for more options</small>
      </div>
    </div>
  );
};

export default ContextMenu;
