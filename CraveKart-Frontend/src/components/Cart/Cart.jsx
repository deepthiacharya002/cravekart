import React from 'react';
import './Cart.css';
import { useLocation, useNavigate } from 'react-router-dom';
import AddressDialog from '../Dialog/AddressDialog/AddressDialog';
import NotificationDialog from '../Dialog/NotifyDialog/NotificationDialog';

const Cart = (props) => {
    const [cartItems, setCartItems] = React.useState(props.cartItems || []);
    const [address, setAddress] = React.useState(null);
    const [showAddressDialog, setShowAddressDialog] = React.useState(false);
    const [notify, setNotify] = React.useState({ message: '', type: '' });

    const location = useLocation();
    const navigate = useNavigate();


    const onPurchase = () => {
        console.log('Purchase initiated');
        if (address) {
            // alert(`Order placed successfully! \nAddress: ${address.addressLine1}, ${address.addressLine2}, ${address.state}, ${address.country}, ${address.pinCode}`);
            const msg = `Order placed successfully! \nAddress: ${address.addressLine1}, ${address.addressLine2}, ${address.state}, ${address.country}, ${address.pinCode}`;
            console.log(msg);
            setNotify({ message: msg, type: 'success', title: 'Order Confirmation' });
        } else {
            setShowAddressDialog(true);
        }
    };

    // const { cartItems, onPurchase } = props;
    const total = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log('Cart Items:', cartItems);

    React.useEffect(() => {
        if (location.state && location.state.length) {
            setCartItems(location.state);
            console.log('Cart items from location state:', location.state);
        }
        console.log('Cart items from location state:', location.state);
    }, [location.state]);

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
                    {cartItems.length === 0 ? (
                        <p>No items selected.</p>
                    ) : (
                        <ul className="cart-list">
                            {cartItems?.map((item) => (
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
                    <div className="payment-info">
                        <p>Payment Method: Cash on Delivery</p>
                        <small>Currently, we only support Cash on Delivery payment option.</small>
                    </div>
                    <button
                        className="purchase-btn"
                        onClick={onPurchase}
                        disabled={cartItems.length === 0}
                    >
                        Place Order - Cash on Delivery
                    </button>
                </div>
        </>
    );
};

export default Cart;
