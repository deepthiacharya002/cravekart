import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, onPurchase }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>No items selected.</p>
            ) : (
                <ul className="cart-list">
                    {cartItems.map((item) => (
                        <li key={item.name} className="cart-item">
                            <span>{item.quantity} x {item.name}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            )}
            <div className="cart-total">
                <strong>Total: ${total.toFixed(2)}</strong>
            </div>
            <button
                className="purchase-btn"
                onClick={onPurchase}
                disabled={cartItems.length === 0}
            >
                Purchase
            </button>
        </div>
    );
};

export default Cart;
