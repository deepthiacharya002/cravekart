import React, { useState, useEffect } from "react";
import "./restaurants.css";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setRestaurants( data.data ? data.data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to load restaurants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleRestaurantClick = (restaurant) => {
    // Navigate to restaurant details page
    navigate("/restaurants/restaurant", {
      state: restaurant, 
    });
  };

  return (
    <div className="restaurants-page">
      {loading && <div className="loading">Loading restaurants...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && restaurants.map((restaurant, idx) => (
        <div
          key={idx}
          className="restaurant-card"
          onClick={() => handleRestaurantClick(restaurant)}
        >
          <img
            src={"/images/resturants/"+restaurant.image}
            alt={restaurant.name}
            className="restaurant-image"
          />
          <h2>{restaurant.name}</h2>
          <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
          <p><strong>Ratings:</strong> ⭐ {restaurant.ratings} </p>
        </div>
      ))}
    </div>
  );
};

export default Restaurants;
