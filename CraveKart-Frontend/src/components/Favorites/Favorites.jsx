import React from 'react';
import { useCart, useCartDispatch } from '../../context/CartContext';
import { cartHelpers } from '../../context/cartHelpers';
import withContextMenu from '../ContextMenu/withContextMenu';
import './Favorites.css';

const Favorites = ({ onContextMenu }) => {
  const cartState = useCart();
  const dispatch = useCartDispatch();
  
  const { favoriteItems } = cartState;

  const handleRemoveFromFavorites = (itemName) => {
    cartHelpers.removeFromFavorites(dispatch, itemName);
  };

  const handleAddToCart = (item) => {
    cartHelpers.addToCart(dispatch, item, 1);
  };

  if (favoriteItems.length === 0) {
    return (
      <div className="favorites-container">
        <h2>Your Favorites</h2>
        <div className="empty-favorites">
          <span className="empty-icon">❤️</span>
          <p>No favorite items yet!</p>
          <small>Right-click on food items to add them to your favorites.</small>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2>Your Favorites</h2>
      <div className="favorites-grid">
        {favoriteItems.map((item) => (
          <div
            key={item.name}
            className="favorite-item"
            onContextMenu={(e) => onContextMenu && onContextMenu(e, item)}
          >
            <img
              src={item.image || '/images/placeholder.jpg'}
              alt={item.name}
              className="favorite-item-image"
              onError={(e) => {
                e.target.src = '/images/placeholder.jpg';
              }}
            />
            <div className="favorite-item-content">
              <h3>{item.name}</h3>
              <p className="favorite-item-price">${item.price.toFixed(2)}</p>
              <div className="favorite-item-actions">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemoveFromFavorites(item.name)}
                  className="remove-favorite-btn"
                  title="Remove from favorites"
                >
                  💔
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FavoritesWithContextMenu = withContextMenu(Favorites);
export default FavoritesWithContextMenu;
