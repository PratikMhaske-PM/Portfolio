import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import './index.css'; // Import global CSS

const App = () => {
  // Manage dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode state
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Store dark mode preference in localStorage and apply to body
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Apply dark mode to localStorage and body element
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <section id="home"><Home /></section>
      <section id="projects"><Projects /></section>
      <section id="blog"><Blog /></section>
      <section id="project-details"><ProjectDetails /></section>
      <section id="about"><About /></section>
      <section id="contact"><Contact /></section>
      <Footer />
    </div>
  );
};

export default App;