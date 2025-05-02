import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Cart.css';

function Cart({ cart, handleRemoveFromCart, setCart }) {
  const navigate = useNavigate();

  // Maintain quantity state
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );

  // Update quantity handler
  const handleQuantityChange = (itemId, value) => {
    const quantity = Math.max(1, Number(value));
    setQuantities(prev => ({ ...prev, [itemId]: quantity }));
  };

  // Calculate totals
  const totalPrice = cart.reduce((total, item) => {
    const qty = quantities[item.id] || 1;
    return total + item.price * qty;
  }, 0);

  const discountPercentage = 10;
  const discountAmount = (totalPrice * discountPercentage) / 100;

  const taxPercentage = 10;
  const taxAmount = (totalPrice * taxPercentage) / 100;

  const finalPrice = totalPrice - discountAmount + taxAmount;

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  const handleClearCart = () => {
    setCart([]); // Clear the cart
    setQuantities({});
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>Price: ₹{item.price}</p>
                <div className="quantity-wrapper">
                  <label>Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantities[item.id]}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  />
                </div>
                <p>Subtotal: ₹{item.price * (quantities[item.id] || 1)}</p>
                <button onClick={() => handleRemoveFromCart(item.id)} className="remove-button">
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <div className="cart-total">
              <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>
              <p>Discount ({discountPercentage}%): -₹{discountAmount.toFixed(2)}</p>
              <p>Tax ({taxPercentage}%): +₹{taxAmount.toFixed(2)}</p>
              <h3>Final Price: ₹{finalPrice.toFixed(2)}</h3>
            </div>

            <button className="checkout-button" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>

            <button className="clear-cart-button" onClick={handleClearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
