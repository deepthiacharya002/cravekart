import './App.css'
import HomePage from './screens/Homepage/Homepage'
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
import AboutPage from './screens/About/About';
import { useState } from 'react';
import Restaurant from './screens/restaurant/restaurant';
import Cart from './components/Cart/Cart';
import HeaderNavbar from './components/Navbar/HeaderNavbar';


function App() {
  const [darkMode] = useState(false);

  const containerClass = darkMode ? 'container dark-mode' : 'container';

  return (
    <>
      <Router>
        {/* <Navbar darkMode={darkMode} setDarkMode={setDarkMode} /> */}
        <HeaderNavbar/>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<HomePage containerClass={containerClass} />} />
          <Route path="/restaurants/restaurant" element={<Restaurant />} />
          <Route path="/cart" element={<Cart />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </>
  )
}

export default App
