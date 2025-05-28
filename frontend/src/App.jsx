import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PersonalInfo from './pages/PersonalInfo';
import "./App.css";

function Protected({ children }) {
  return localStorage.getItem('token') ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <Protected>
                <PersonalInfo />
              </Protected>
            }
          />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}