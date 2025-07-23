import Navbar from './components/Header/Navbar'
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
import Restaurant from './screens/Restaurant/restaurant';


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const containerClass = darkMode ? 'container dark-mode' : 'container';

  return (
    <>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<HomePage containerClass={containerClass} />} />
          <Route path="/restaurants/restaurant" element={<Restaurant />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </>
  )
}

export default App
