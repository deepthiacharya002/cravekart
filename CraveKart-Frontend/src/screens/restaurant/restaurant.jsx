import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './restaurant.css';
import { useNavigate } from 'react-router-dom';

const Restaurant = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const restaurant = location.state;

    // State to track quantities for each food item
    const [quantities, setQuantities] = useState({});

    // Handle quantity change
    const handleQuantityChange = (foodName, value) => {
        setQuantities((prev) => ({
            ...prev,
            [foodName]: Math.max(0, Number(value)),
        }));
    };

    // Handle Add to Cart (replace with your cart logic)
    const handleAddToCart = (item) => {
        const qty = quantities[item.name] || 0;
        if (qty > 0) {
            // alert(`Added ${qty} x ${item.name} to cart!`);
            const selectedItem = { ...item, quantity: qty };
            navigate('/cart', { state: [selectedItem] });
        } else {
            alert(`Please select at least 1 item to add to cart.`);
        }
        // TODO: Integrate with your cart state/logic
    };

    // Handle Add All to Cart
    const handleAddAllToCart = () => {
        if (!restaurant.foods) return;
        const itemsToAdd = restaurant.foods.filter(item => (quantities[item.name] || 0) > 0);
        if (itemsToAdd.length === 0) {
            alert('Please select at least 1 item to add to cart.');
            return;
        }
        // let message = 'Added to cart:\n';
        const items = [];
        itemsToAdd.forEach(item => {
            // message += `${quantities[item.name] || 0} x ${item.name}\n`;
            const selectedItem = { ...item, quantity: quantities[item.name] || 0 };
            items.push(selectedItem);
        });
        // alert(message);
        console.log('Items added to cart:', items);
        navigate('/cart', { state: items });
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
                            <div className="quantity-selector">
                                <button
                                    className="quantity-btn"
                                    onClick={() => handleQuantityChange(item.name, (quantities[item.name] || 0) - 1)}
                                    disabled={(quantities[item.name] || 0) <= 0}
                                >−</button>
                                <span className="quantity-value">{quantities[item.name] || 0}</span>
                                <button
                                    className="quantity-btn"
                                    onClick={() => handleQuantityChange(item.name, (quantities[item.name] || 0) + 1)}
                                >+</button>
                            </div>
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
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                <button
                    className="add-to-cart-btn"
                    onClick={handleAddAllToCart}
                >
                    Add All Selected Items to Cart
                </button>
            </div>
        </div>
        </>
    );
};

export default Restaurant;