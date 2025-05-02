import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import './Home.css';

function Home({ handleAddToCart }) {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodCollection = collection(db, "foods");
        const foodSnapshot = await getDocs(foodCollection);
        const foodList = foodSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFoods(foodList);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter((food) => {
    const name = food.name ? food.name.toLowerCase() : "";  // Use an empty string if food.name is undefined
    const matchesName = name.includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
    const matchesPrice =
      priceRange === "All" ||
      (priceRange === "0-100" && food.price <= 100) ||
      (priceRange === "101-200" && food.price > 100 && food.price <= 200) ||
      (priceRange === "201-500" && food.price > 200 && food.price <= 500);

    return matchesName && matchesCategory && matchesPrice;
  });

  const handleAddToCartWithAlert = (food) => {
    handleAddToCart(food);  // Add the food to the cart
    alert(`${food.name} has been added to your cart!`);  // Display an alert
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Delicious Delivered 🍕</h1>
          <p>Order your favorite meals in seconds</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Dosa">Dosa</option>
          <option value="Drinks">Drinks</option>
        </select>
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="All">All Prices</option>
          <option value="0-100">₹0 - ₹100</option>
          <option value="101-200">₹101 - ₹200</option>
          <option value="201-500">₹201 - ₹500</option>
        </select>
      </div>

      {/* Food Grid */}
      <div className="food-grid">
        {filteredFoods.length === 0 ? (
          <p>No items match your filters.</p>
        ) : (
          filteredFoods.map((food) => (
            <div key={food.id} className="food-card">
              <img src={food.image} alt={food.name} className="food-image" />
              <h3 className="food-name">{food.name}</h3>
              <p className="food-price">₹{food.price}</p>
              <button className="add-button" onClick={() => handleAddToCartWithAlert(food)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
