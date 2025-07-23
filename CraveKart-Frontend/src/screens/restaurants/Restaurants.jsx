import React from "react";
import restaurants from "./restaurants.json";
import "./restaurants.css";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
  const navigate = useNavigate();

  const handleRestaurantClick = (restaurant) => {
    // Navigate to restaurant details page
    navigate("/restaurants/restaurant", {
      state: restaurant, 
    });
  };

  return (
    <div className="restaurants-page">
      {restaurants.map((restaurant, idx) => (
        <div
          key={idx}
          className="restaurant-card"
          onClick={() => handleRestaurantClick(restaurant)}
        >
          <img
            src={restaurant.image}
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
