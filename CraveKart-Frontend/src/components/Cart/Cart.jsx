import React from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import AddressDialog from '../Dialog/AddressDialog/AddressDialog';
import NotificationDialog from '../Dialog/NotifyDialog/NotificationDialog';
import { useCart, useCartDispatch } from '../../context/CartContext';
import { cartHelpers } from '../../context/cartHelpers';

const Cart = () => {
    const cartState = useCart();
    const dispatch = useCartDispatch();
    const navigate = useNavigate();
    
    const [address, setAddress] = React.useState(null);
    const [showAddressDialog, setShowAddressDialog] = React.useState(false);
    const [notify, setNotify] = React.useState({ message: '', type: '' });

    const { cartItems = [], totalAmount = 0 } = cartState || {};

    const sendOrderToBackend = async (order) => {
        try {
            const response = await fetch('http://localhost:5000/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            const data = await response.json();
            console.log('Order sent to backend:', data);
        } catch (error) {
            console.error('Error sending order:', error);
        }
    };

    const onPurchase = () => {
        console.log('Purchase initiated');
        if (address) {
            const msg = `Order placed successfully! \nAddress: ${address.addressLine1}, ${address.addressLine2}, ${address.state}, ${address.country}, ${address.pinCode}`;
            console.log(msg);
            
            // Add order to history
            const order = {
                id: Date.now(),
                items: cartItems,
                total: totalAmount,
                address: address,
                date: new Date().toISOString(),
                status: 'placed'
            };
            cartHelpers.addToOrderHistory(dispatch, order);
            
            // Clear cart after order
            
            sendOrderToBackend(order).then(() => {
                console.log('Order sent to backend successfully');
                setNotify({ message: msg, type: 'success', title: 'Order Confirmation' });
                cartHelpers.clearCart(dispatch);
            }).catch(err => {
                console.error('Failed to send order to backend:', err);
            });
            
        } else {
            setShowAddressDialog(true);
        }
    };

    return (
        <>
            <AddressDialog
                isOpen={showAddressDialog}
                onClose={() => setShowAddressDialog(false)}
                onSave={(address) => {
                    setAddress(address);
                    setShowAddressDialog(false);
                }}
            />
            <NotificationDialog
                message={notify.message}
                type={notify.type}
                title={notify.title}
                btnTitle="Go to Home Screen"
                onBtnClick={() => {
                    setNotify({ message: '', type: '' });
                    navigate('/');
                }}
                onClose={() => setNotify({ message: '', type: '' })}
            />
            <div className="cart-container">
                <h2>Your Cart</h2>
                
                {!cartItems || cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-cart-icon">🛒</div>
                        <h3>Your cart is empty</h3>
                        <p>Looks like you haven't added any delicious items to your cart yet. Browse our menu and discover amazing food!</p>
                        <button 
                            className="browse-items-btn"
                            onClick={() => navigate('/')}
                        >
                            Browse Menu
                        </button>
                    </div>
                ) : (
                    <ul className="cart-list">
                        {cartItems.map((item, index) => (
                            <li key={`${item.name}-${index}`} className="cart-item">
                                <span>{item.quantity} x {item.name}</span>
                                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="cart-total">
                    <strong>Total: ₹{(totalAmount || 0).toFixed(2)}</strong>
                </div>
                <div className="payment-info">
                    <p>Payment Method: Cash on Delivery</p>
                    <small>Currently, we only support Cash on Delivery payment option.</small>
                </div>
                <button
                    className="purchase-btn"
                    onClick={onPurchase}
                    disabled={!cartItems || cartItems.length === 0}
                >
                    Place Order - Cash on Delivery
                </button>
            </div>
        </>
    );
};

export default Cart;
