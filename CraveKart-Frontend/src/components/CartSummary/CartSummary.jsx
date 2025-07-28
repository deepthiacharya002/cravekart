import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart, useCartDispatch } from '../../context/CartContext';
import { cartHelpers } from '../../context/cartHelpers';
import './CartSummary.css';

const CartSummary = () => {
  const navigate = useNavigate();
  const cartState = useCart();
  const dispatch = useCartDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const { cartItems, totalAmount, totalItems } = cartState;

  if (totalItems === 0) return null;

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleUpdateQuantity = (itemName, newQuantity) => {
    cartHelpers.updateQuantity(dispatch, itemName, newQuantity);
  };

  const handleRemoveItem = (itemName) => {
    cartHelpers.removeFromCart(dispatch, itemName);
  };

  return (
    <div className={`cart-summary ${isExpanded ? 'expanded' : ''}`}>
      <div className="cart-summary-header" onClick={handleToggleExpanded}>
        <div className="cart-summary-icon">
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{totalItems}</span>
        </div>
        <div className="cart-summary-info">
          <span className="cart-total">${totalAmount.toFixed(2)}</span>
          <span className="cart-text">
            {totalItems} item{totalItems !== 1 ? 's' : ''}
          </span>
        </div>
        <span className={`cart-summary-arrow ${isExpanded ? 'rotated' : ''}`}>
          ▼
        </span>
      </div>

      {isExpanded && (
        <div className="cart-summary-content">
          <div className="cart-summary-items">
            {cartItems.map((item) => (
              <div key={item.name} className="cart-summary-item">
                {/* <img
                  src={item.image || '/images/placeholder.jpg'}
                  alt={item.name}
                  className="cart-summary-item-image"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                /> */}
                <div className="cart-summary-item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)} each</p>
                </div>
                <div className="cart-summary-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleUpdateQuantity(item.name, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.name, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.name)}
                    className="remove-btn"
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary-footer">
            <div className="cart-summary-total">
              <strong>Total: ${totalAmount.toFixed(2)}</strong>
            </div>
            <button onClick={handleGoToCart} className="checkout-btn">
              Go to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
