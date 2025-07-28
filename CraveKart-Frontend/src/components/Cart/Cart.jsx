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

    // Debug logging
    React.useEffect(() => {
        console.log('Cart component - cartState:', cartState);
        console.log('Cart component - cartItems:', cartItems);
        console.log('Cart component - totalAmount:', totalAmount);
    }, [cartState, cartItems, totalAmount]);


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
            cartHelpers.clearCart(dispatch);
            
            setNotify({ message: msg, type: 'success', title: 'Order Confirmation' });
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
                    {/* Debug info */}
                    {/* <div style={{fontSize: '12px', color: '#666', marginBottom: '10px'}}>
                        Debug: Items in cart: {cartItems?.length || 0}, Total: ${totalAmount?.toFixed(2) || '0.00'}
                        <br />
                        Cart State: {JSON.stringify(cartState, null, 2)}
                    </div> */}
                    
                    {/* Test button */}
                    {/* <button 
                        onClick={() => {
                            const testItem = { name: 'Direct Test Item', price: 5 };
                            cartHelpers.addToCart(dispatch, testItem, 2);
                        }}
                        style={{ marginBottom: '10px', padding: '5px 10px', fontSize: '12px' }}
                    >
                        Test Add Item Directly
                    </button> */}
                    
                    {!cartItems || cartItems.length === 0 ? (
                        <p>No items selected.</p>
                    ) : (
                        <ul className="cart-list">
                            {cartItems.map((item, index) => (
                                <li key={`${item.name}-${index}`} className="cart-item">
                                    <span>{item.quantity} x {item.name}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="cart-total">
                        <strong>Total: ${(totalAmount || 0).toFixed(2)}</strong>
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
