// pages/About.js
import React from 'react';
import './About.css';
import Profile from '../assets/Profile.jpg'
import client1 from '../assets/client1.png'
import client2 from '../assets/client2.png';

function About() {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About Me</h1>
        <div className="breadcrumbs">Home / About Me</div>
      </div>
      
      <section className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img src={Profile} alt="Developer Profile" />
          </div>
          
          <div className="about-content">
            <h2>Hi, I'm Pratik Mhaske</h2>
            <h3>Web Developer & UI/UX Enthusiast</h3>
            
            <p>
              I'm a passionate web developer with 5+ years of experience creating modern, 
              responsive, and user-friendly websites and applications. My journey in web 
              development began during my college years, where I discovered my love for 
              turning ideas into digital realities.
            </p>
            
            <p>
              I specialize in frontend development with React.js and have strong experience 
              with backend technologies like Node.js and MongoDB. My approach to development
              is centered around creating intuitive user experiences while writing clean,
              maintainable code.
            </p>
            
            <div className="personal-info">
              <div className="info-item">
                <span className="label">Name:</span>
                <span className="value">Pratik Mhaske</span>
              </div>
              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">pratikmhaske66@gmail.com</span>
              </div>
              <div className="info-item">
                <span className="label">Location:</span>
                <span className="value">Wagholi,Pune-412207</span>
              </div>
              <div className="info-item">
                <span className="label">Availability:</span>
                <span className="value">Freelance & Full-time</span>
              </div>
            </div>
            
            <div className="about-buttons">
              <a href="/resume.pdf" className="btn primary-btn" download>Download Resume</a>
              <a href="/contact" className="btn secondary-btn">Contact Me</a>
            </div>
          </div>
        </div>
      </section>
      
      <section className="experience-section">
        <h2 className="section-title">Experience & Education</h2>
        
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2025 - Present</div>
            <div className="timeline-content">
              <h3>Senior Frontend Developer</h3>
              <p className="company">Web Solutions</p>
              <p>Leading frontend development for enterprise SaaS products, implementing 
              React component libraries and optimizing application performance.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2025 - 2027</div>
            <div className="timeline-content">
              <h3>Web Developer</h3>
              <p className="company">Digital Solutions Agency</p>
              <p>Developed responsive websites and applications for clients across various industries,
              focusing on performance and accessibility.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">2022 - 2026</div>
            <div className="timeline-content">
              <h3>BE Computer Science</h3>
              <p className="company">JSPM BSIOTR</p>
              <p>Graduated with honors, specializing in web technologies and user interface design.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="skills-section">
        <h2 className="section-title">Professional Skills</h2>
        
        <div className="skills-container">
          <div className="skill-category">
            <h3>Technical Skills</h3>
            <div className="skills-list">
              <div className="skill-item">
                <span className="skill-name">JavaScript</span>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: "95%"}}></div>
                </div>
              </div>
              <div className="skill-item">
                <span className="skill-name">React.js</span>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: "90%"}}></div>
                </div>
              </div>
              <div className="skill-item">
                <span className="skill-name">HTML5 & CSS3</span>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: "95%"}}></div>
                </div>
              </div>
              <div className="skill-item">
                <span className="skill-name">Node.js</span>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: "80%"}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="skill-category">
            <h3>Soft Skills</h3>
            <div className="skills-list">
              <div className="skill-item">
                <span className="skill-name">Problem Solving</span>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: "90%"}}></div>
                </div>
              </div>
              <div className="skill-item">
                <span className="skill-name">Communication</span>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: "85%"}}></div>
                </div>
              </div>
              <div className="skill-item">
                <span className="skill-name">Team Collaboration</span>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: "90%"}}></div>
                </div>
              </div>
              <div className="skill-item">
                <span className="skill-name">Time Management</span>
                <div className="skill-bar">
                  <div className="skill-progress" style={{width: "85%"}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="testimonials-section">
        <h2 className="section-title">What People Say</h2>
        
        <div className="testimonials-container">
          <div className="testimonial">
            <div className="testimonial-content">
              <p>"Pratik is an exceptional developer who delivers clean code and innovative solutions.
              Working with them has been a pleasure, and the results speak for themselves."</p>
            </div>
            <div className="testimonial-author">
              <img src={client2} alt="Client" className="testimonial-image" />
              <div className="author-info">
                <h4>Jane Smith</h4>
                <p>Project Manager, Digital Solutions</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial">
            <div className="testimonial-content">
              <p>"One of the most dedicated developers I've worked with. Alex consistently
              exceeds expectations and brings valuable insights to every project."</p>
            </div>
            <div className="testimonial-author">
              <img src={client1} alt="Client" className="testimonial-image" />
              <div className="author-info">
                <h4>Mark Johnson</h4>
                <p>CTO, TechStartup Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
}

export default About;