import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './restaurant.css';

const Restaurant = () => {
    const location = useLocation();
    const restaurant = location.state;

    // State to track quantities for each food item
    const [quantities, setQuantities] = useState({});

    // Handle quantity change
    const handleQuantityChange = (foodName, value) => {
        setQuantities((prev) => ({
            ...prev,
            [foodName]: Math.max(1, Number(value)),
        }));
    };

    // Handle Add to Cart (replace with your cart logic)
    const handleAddToCart = (item) => {
        const qty = quantities[item.name] || 1;
        alert(`Added ${qty} x ${item.name} to cart!`);
        // TODO: Integrate with your cart state/logic
    };

    if (!restaurant) return <div style={{ padding: '20px' }}>Loading...</div>;

    return (
        <>
        <div className='restaurant-container-parent'> </div>
        <div className="restaurant-container">
            <h1>{restaurant.name}</h1>
            <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
            <p><strong>Rating:</strong> ⭐ {restaurant.ratings}</p>
            <h2>Menu</h2>
            <ul className="menu-list">
                {restaurant.foods && restaurant.foods.map((item) => (
                    <li key={item.name} className="menu-item">
                        <div className="food-info">
                            <span className="food-name">{item.name}</span>
                            <span className="food-price">${item.price.toFixed(2)}</span>
                        </div>
                        <div className="food-actions">
                            <input
                                type="number"
                                min="1"
                                className="quantity-input"
                                value={quantities[item.name] || 1}
                                onChange={(e) => handleQuantityChange(item.name, e.target.value)}
                            />
                            <button
                                className="add-to-cart-btn"
                                onClick={() => handleAddToCart(item)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default Restaurant;