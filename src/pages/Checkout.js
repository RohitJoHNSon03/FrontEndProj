import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './Checkout.css';

function Checkout({ cart }) {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();
  const safeCart = cart || [];

  const totalPrice = safeCart.reduce((total, item) => total + item.price, 0);
  const discount = (totalPrice * 10) / 100;
  const tax = (totalPrice * 10) / 100;
  const finalPrice = totalPrice - discount + tax;

  const handlePlaceOrder = async () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please enter complete card details.");
      return;
    }

    // Basic card number validation (just for demo)
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }

    // Basic expiry date validation (MM/YY format)
    const expiryParts = expiryDate.split('/');
    if (expiryParts.length !== 2 || expiryParts[0].length !== 2 || expiryParts[1].length !== 2) {
      alert("Please enter a valid expiry date in MM/YY format.");
      return;
    }

    // Basic CVV validation (3 digits)
    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("Please enter a valid 3-digit CVV.");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        name,
        cart: safeCart,
        total: finalPrice,
        status: "Pending",
        createdAt: new Date(),
        payment: {
          cardNumber,
          expiryDate,
          cvv,
        },
      });

      alert("Order placed successfully!");
      navigate("/payment"); // Navigate to dummy payment page
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {safeCart.length === 0 ? (
        <p>Your cart is empty. Add some items to proceed!</p>
      ) : (
        <div>
          <label>
            Name:{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <div>
            <label>
              Card Number:{" "}
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength="16"
                placeholder="Enter 16-digit card number"
                required
              />
            </label>
          </div>

          <div>
            <label>
              Expiry Date (MM/YY):{" "}
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </label>
          </div>

          <div>
            <label>
              CVV:{" "}
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength="3"
                placeholder="Enter 3-digit CVV"
                required
              />
            </label>
          </div>

          {safeCart.map((item, index) => (
            <div key={index} className="checkout-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>
            </div>
          ))}

          <div className="checkout-summary">
            <h3>Total Price: ₹{totalPrice}</h3>
            <p>Discount: -₹{discount}</p>
            <p>Tax: +₹{tax}</p>
            <h3 className="final-price">Final Price: ₹{finalPrice}</h3>
          </div>

          <button onClick={handlePlaceOrder}>Place Order</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
