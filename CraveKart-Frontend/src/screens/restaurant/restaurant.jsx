import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './restaurant.css';
import { useCart, useCartDispatch } from '../../context/CartContext';
import { cartHelpers } from '../../context/cartHelpers';
import withContextMenu from '../../components/ContextMenu/withContextMenu';

const Restaurant = ({ onContextMenu }) => {
    const location = useLocation();
    const restaurant = location.state;
    
    const cartState = useCart();
    const dispatch = useCartDispatch();

    // State to track quantities for each food item
    const [quantities, setQuantities] = useState({});

    // Handle quantity change
    const handleQuantityChange = (foodName, value) => {
        setQuantities((prev) => ({
            ...prev,
            [foodName]: Math.max(0, Number(value)),
        }));
    };

    // Handle Add to Cart using context
    const handleAddToCart = (item) => {
        const qty = quantities[item.name] || 0;
        if (qty > 0) {
            console.log('Adding to cart:', item, 'quantity:', qty);
            cartHelpers.addToCart(dispatch, item, qty);
            console.log('Cart state after adding:', cartState);
            // Reset the local quantity after adding to cart
            setQuantities(prev => ({ ...prev, [item.name]: 0 }));
        } else {
            alert(`Please select at least 1 item to add to cart.`);
        }
    };

    // Handle Add All to Cart
    const handleAddAllToCart = () => {
        if (!restaurant.foods) return;
        const itemsToAdd = restaurant.foods.filter(item => (quantities[item.name] || 0) > 0);
        if (itemsToAdd.length === 0) {
            alert('Please select at least 1 item to add to cart.');
            return;
        }
        
        itemsToAdd.forEach(item => {
            cartHelpers.addToCart(dispatch, item, quantities[item.name] || 0);
        });
        
        // Reset all quantities after adding to cart
        setQuantities({});
    };

    // Get current cart quantity for an item
    const getCartQuantity = (itemName) => {
        const cartItem = cartState.cartItems.find(item => item.name === itemName);
        return cartItem ? cartItem.quantity : 0;
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
                {restaurant.foods && restaurant.foods.map((item) => {
                    const cartQuantity = getCartQuantity(item.name);
                    return (
                        <li 
                            key={item.name} 
                            className="menu-item"
                            onContextMenu={(e) => onContextMenu && onContextMenu(e, item)}
                        >
                            <div className="food-info">
                                <span className="food-name">{item.name}</span>
                                <span className="food-price">${item.price.toFixed(2)}</span>
                                {cartQuantity > 0 && (
                                    <span className="cart-indicator">
                                        In cart: {cartQuantity}
                                    </span>
                                )}
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
                    );
                })}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', gap: '12px' }}>
                <button
                    className="add-to-cart-btn"
                    onClick={handleAddAllToCart}
                >
                    Add All Selected Items to Cart
                </button>
                
                {/* Debug button */}
                {/* <button
                    className="add-to-cart-btn"
                    onClick={() => {
                        const testItem = { name: 'Test Item', price: 10 };
                        console.log('Test adding item:', testItem);
                        cartHelpers.addToCart(dispatch, testItem, 1);
                        console.log('Cart state after test add:', cartState);
                    }}
                    style={{ background: '#007bff' }}
                >
                    Test Add Item
                </button> */}
            </div>
        </div>
        </>
    );
};

const RestaurantWithContextMenu = withContextMenu(Restaurant);
export default RestaurantWithContextMenu;