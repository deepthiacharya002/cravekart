import React, { useState } from 'react';
import './UserGuide.css';

const UserGuide = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button 
        className="guide-toggle-btn"
        onClick={() => setIsVisible(true)}
        title="Show User Guide"
      >
        ❓
      </button>
    );
  }

  return (
    <div className="user-guide">
      <div className="user-guide-header">
        <h3>🎯 Quick Guide</h3>
        <button 
          className="close-btn"
          onClick={() => setIsVisible(false)}
        >
          ✕
        </button>
      </div>
      
      <div className="user-guide-content">
        <div className="guide-item">
          <span className="guide-icon">🖱️</span>
          <div>
            <strong>Right-click</strong> on any food item to open context menu
          </div>
        </div>
        
        <div className="guide-item">
          <span className="guide-icon">🛒</span>
          <div>
            <strong>Quick actions:</strong> Add to cart, favorites, or quick order
          </div>
        </div>
        
        <div className="guide-item">
          <span className="guide-icon">❤️</span>
          <div>
            <strong>Favorites:</strong> Save items you love for later
          </div>
        </div>
        
        <div className="guide-item">
          <span className="guide-icon">📦</span>
          <div>
            <strong>Cart Summary:</strong> View your cart in the floating widget
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
