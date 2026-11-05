import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

// Turn a price string like "$15" into the number 15
const parseCost = (cost) => parseFloat(String(cost).replace(/[^0-9.]/g, '')) || 0;

const formatMoney = (value) => `$${value.toFixed(2)}`;

function CartItem({ onHome, onPlants, onCart, onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total cost for one plant (unit price x quantity)
  const calculateTotalCost = (item) => parseCost(item.cost) * item.quantity;

  // Total amount for every plant in the cart
  const calculateTotalAmount = () =>
    cartItems.reduce((sum, item) => sum + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Going below 1 removes the plant from the cart
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div>
      {/* Navbar: Home, Plants, Cart */}
      <nav className="navbar">
        <button className="navbar-brand" onClick={onHome} aria-label="Paradise Nursery home">
          <img src={`${import.meta.env.BASE_URL}plants/snake-plant.svg`} alt="" />
          <span>Paradise Nursery</span>
        </button>
        <div className="navbar-links">
          <button className="navbar-link" onClick={onHome}>Home</button>
          <button className="navbar-link" onClick={onPlants}>Plants</button>
          <button className="navbar-link cart-link active" onClick={onCart} aria-current="page" aria-label={`Cart, ${totalQuantity} items`}>
            <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H6" />
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </button>
        </div>
      </nav>

      <main className="page-wrap">
        <h1 className="cart-title">Your Cart</h1>
        <p className="cart-total-amount">Total: {formatMoney(calculateTotalAmount())}</p>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            Your cart is empty. Pick a few plants to get started.
          </div>
        ) : (
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-row" key={item.name}>
                <img className="cart-thumb" src={item.image} alt={item.name} />
                <div>
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-unit-price">Unit price: {formatMoney(parseCost(item.cost))}</p>
                </div>
                <div className="quantity-controls">
                  <button className="quantity-button" onClick={() => handleDecrement(item)} aria-label={`Decrease quantity of ${item.name}`}>
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button className="quantity-button" onClick={() => handleIncrement(item)} aria-label={`Increase quantity of ${item.name}`}>
                    +
                  </button>
                </div>
                <div className="cart-subtotal">{formatMoney(calculateTotalCost(item))}</div>
                <button className="delete-button" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-actions">
          <button className="continue-button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-button" onClick={() => setShowCheckoutMessage(true)}>
            Checkout
          </button>
        </div>

        {showCheckoutMessage && (
          <p className="checkout-message" role="status">
            Checkout is Coming Soon. Thanks for shopping with Paradise Nursery!
          </p>
        )}
      </main>
    </div>
  );
}

export default CartItem;
