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
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Favorites from './components/Favorites/Favorites';
import LoginModal from './components/Auth/LoginModal';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  const [darkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const containerClass = darkMode ? 'container dark-mode' : 'container';

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <HeaderNavbar onLoginClick={() => setShowLoginModal(true)} />
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<HomePage containerClass={containerClass} />} />
            <Route path="/restaurants/restaurant" element={<Restaurant />}/>
            <Route path="/cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
