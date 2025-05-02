import React from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import './Cart.css'; // <-- Import the CSS file

function Cart({ cart, handleRemoveFromCart }) {
  const navigate = useNavigate(); // <-- Initialize useNavigate

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // Apply discount (let's assume a 10% discount for simplicity)
  const discountPercentage = 10; // 10% discount
  const discountAmount = (totalPrice * discountPercentage) / 100;

  // Apply tax (let's assume a 10% tax for simplicity)
  const taxPercentage = 10; // 10% tax
  const taxAmount = (totalPrice * taxPercentage) / 100;

  // Final price after applying discount and adding tax
  const finalPrice = totalPrice - discountAmount + taxAmount;

  const handleProceedToCheckout = () => {
    navigate("/checkout"); // <-- Navigate to the checkout page
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h4 className="cart-item-name">{item.name}</h4>
              <p className="cart-item-price">₹{item.price}</p>
              <button className="remove-button" onClick={() => handleRemoveFromCart(item.id)}>
                Remove from Cart
              </button>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="cart-total">
            <h3>Total Price: ₹{totalPrice}</h3>
            <p>Discount ({discountPercentage}%): -₹{discountAmount}</p>
            <p>Tax ({taxPercentage}%): +₹{taxAmount}</p>
            <h3>Final Price: ₹{finalPrice}</h3>
          </div>

          <button className="checkout-button" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
