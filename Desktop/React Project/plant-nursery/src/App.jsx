import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Pages
import Home from './pages/Home';
import Category from './pages/Category';
import Guide from './pages/Guide';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';

// Context
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingNavbar from './components/common/FloatingNavbar';

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <FloatingNavbar />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;