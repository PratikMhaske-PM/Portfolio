// pages/Home.js
import React from 'react';
import './Home.css';
//import profile from '../assets/profile.jpg'

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1>Hi, I'm <span className="highlight">Pratik Mhaske</span></h1>
          <h2>Creative Web Developer</h2>
          <p>I build exceptional digital experiences that live at the intersection of design and technology.</p>
          <div className="hero-buttons">
            <a href="#Projects" className="btn">View My Work</a>
            <a href="tel:+919529214473" className="btn btn-outline">Contact Me</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="developer-illustration"></div>
        </div>
      </section>

      {/* About Preview Section */}
      <section id="about" className="section about-preview">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <p>
            I'm a passionate web developer with expertise in building modern, responsive web applications. 
            With a strong foundation in React and other cutting-edge technologies, I create user-friendly 
            and accessible digital experiences.
          </p>
          <a href="#about" className="read-more">Read More About Me →</a>
        </div>
      </section>

      {/* Skills Preview */}
      <section id="skills" className="section skills-preview">
        <h2 className="section-title">My Tech Stack</h2>
        <div className="tech-stack">
          <div className="tech-icon"><i className="fab fa-react"></i><span>React</span></div>
          <div className="tech-icon"><i className="fab fa-js"></i><span>JavaScript</span></div>
          <div className="tech-icon"><i className="fab fa-html5"></i><span>HTML5</span></div>
          <div className="tech-icon"><i className="fab fa-css3-alt"></i><span>CSS3</span></div>
          <div className="tech-icon"><i className="fab fa-node-js"></i><span>Node.js</span></div>
          <div className="tech-icon"><i className="fas fa-database"></i><span>MongoDB</span></div>
        </div>
        <div className="center-button">
          <a href="#skills" className="btn btn-outline">All Skills</a>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="section featured-projects">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-image1"></div>
            <div className="project-content">
              <h3>E-Commerce Platform</h3>
              <p>A full-stack e-commerce solution with user authentication, product management, and payment processing.</p>
              <div className="project-tech">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
              </div>
              <div className="project-links">
                <a href="#" className="project-link">Live Demo</a>
                <a href="#" className="project-link">GitHub</a>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image2"></div>
            <div className="project-content">
              <h3>Task Management App</h3>
              <p>A responsive task management application with drag-and-drop functionality and real-time updates.</p>
              <div className="project-tech">
                <span>React</span>
                <span>Firebase</span>
                <span>Tailwind CSS</span>
              </div>
              <div className="project-links">
                <a href="#" className="project-link">Live Demo</a>
                <a href="#" className="project-link">GitHub</a>
              </div>
            </div>
          </div>
        </div>
        <div className="center-button">
          <a href="#projects" className="btn">View All Projects</a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <h2 className="section-title">What Clients Say</h2>
        <div className="testimonial-slider">
          <div className="testimonial">
            <div className="quote">"Pratik delivered our project on time and exceeded our expectations. The attention to detail and user experience was impressive."</div>
            <div className="testimonial-author">
              <div className="author-info">
                <h4>John Smith</h4>
                <p>CEO, Tech Innovations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="contact" className="cta-section">
        <h2>Ready to start a project?</h2>
        <p>Let's create something amazing together.</p>
        <a href="tel:+919529214473" className="btn">Get in Touch</a>
      </section>
    </div>
  );
}

export default Home;
