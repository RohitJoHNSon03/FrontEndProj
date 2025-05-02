import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import PaymentPage from "./pages/PaymentPage";

function App() {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const handleAddToCart = (food) => {
    setCart((prevCart) => [...prevCart, food]);
  };

  // Remove item from cart
  const handleRemoveFromCart = (foodId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== foodId));
  };

  // Total price for payment page
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home handleAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cart} />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/payment"
          element={<PaymentPage totalPrice={totalPrice} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
