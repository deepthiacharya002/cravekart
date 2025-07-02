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
        </Routes>
      </Router>
    </>
  )
}

export default App
