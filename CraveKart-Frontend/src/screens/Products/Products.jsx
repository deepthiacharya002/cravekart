// App.jsx
import React from 'react';
import './products.css';
// import { FaMapMarkerAlt } from 'react-icons/fa';
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons';

const categories = [
  { label: 'Biryani', img: '/images/Chicken-Biryani-Square.jpg', description: 'Aromatic rice with flavorful spices and meat or vegetables.' },
  { label: 'Chicken', img: '/images/Chicken-Biryani-Square.jpg', description: 'Delicious chicken dishes prepared in various styles.' },
  { label: 'Pizza', img: '/images/Chicken-Biryani-Square.jpg', description: 'Cheesy, crusty, and topped with your favorite ingredients.' },
  { label: 'Healthy Food', img: '/images/Chicken-Biryani-Square.jpg', description: 'Nutritious meals packed with fresh vegetables and lean proteins.' },
  { label: 'Veg Meal', img: '/images/Chicken-Biryani-Square.jpg', description: 'Wholesome vegetarian meals with Indian flavors.' },
  { label: 'Thali', img: '/images/Chicken-Biryani-Square.jpg', description: 'Traditional Indian platter with multiple dishes.' }
];

const App = () => {
  return (
    <div className="app-product">
      {/* <header className</nav>="header">
        <div className="logo">zomato</div>
        <div className="location">
          <HomeOutlined />
          <input type="text" placeholder="Table Space UB City, UB City..." />
        </div>
        <div className="search">
          <input type="text" placeholder="Search for restaurant, cuisine or a dish" />
        </div>
        <div className="auth-buttons">
          <button>Log in</button>
          <button>Sign up</button>
        </div>
      </header> */}

      <nav className="nav">
        {/* <button>Dining Out</button> */}
        <button className="active">Delivery</button>
        {/* <button>Nightlife</button> */}
      </nav>

      {/* <div className="filters">
        <button>Filters</button>
        <button>Pure Veg</button>
        <select>
          <option>Cuisines</option>
        </select>
      </div> */}

      <section className="inspiration">
        <h2>Inspiration for your first order</h2>
        <div className="categories">
          {categories.map((cat, idx) => (
            <div className="category-card" key={idx}>
              <div className="category-image-wrapper">
                <img src={cat.img} alt={cat.label} />
              </div>
              <div className="category-label">
                <span>{cat.label}</span>
                <p className="category-description">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
