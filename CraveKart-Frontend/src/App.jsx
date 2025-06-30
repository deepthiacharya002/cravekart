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


function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
        {/* <Switch> */}
          <Route path="/about" element={<AboutPage/>} />
          <Route path="/" element={<HomePage />} />
        {/* </Switch> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
