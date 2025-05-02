import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';  // Import the CSS file

function Navbar() {
  return (
    <nav>
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/cart" className="nav-link">Cart</Link>
      <Link to="/checkout" className="nav-link">Checkout</Link>
      <Link to="/admin" className="nav-link">Admin</Link>
    </nav>
  );
}

export default Navbar;
