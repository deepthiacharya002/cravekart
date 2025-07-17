import React from "react";
import restaurants from "./restaurants.json";
import "./restaurants.css";

/*const restaurantImage = "https://b.zmtcdn.com/data/pictures/6/18700156/869460d7dbdde843008eba8457e13f3d.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*";*/
const Restaurants = () => {

  return (
    <div className="restaurants-page">
      {restaurants.map((restaurant, idx) => (
        <div
          key={idx}
         
          className="restaurant-card"
        >
          <img
            src= {restaurant.image}
            alt={restaurant.name}
            className="restaurant-image"
          />
          <h2>{restaurant.name}</h2>
          <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
          <p><strong>Ratings:</strong> ⭐ {restaurant.ratings} </p>

          {/* <h4>Dishes:</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {restaurant.foods.map((food, fidx) => (
              <div
                key={fidx}
                style={{
                  width: "180px",
                  padding: "0.5rem",
                  border: "1px solid #eee",
                  borderRadius: "8px",
                  textAlign: "center"
                }}
              >
                <img
                  src={food.image}
                  alt={food.name}
                  style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "6px" }}
                />
                <p style={{ margin: "0.5rem 0 0.2rem" }}>{food.name}</p>
                <p style={{ fontWeight: "bold" }}>₹{food.price}</p>
              </div>
            ))}
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Restaurants;
