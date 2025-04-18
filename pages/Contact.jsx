import React, { useState, useRef, useEffect } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';
import { initAnimations, animateElement } from './Animation'; // Import animation utilities

function Contact() {
  const form = useRef();
  const contactInfoRef = useRef();
  const formContainerRef = useRef();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize animations after component mounts
  useEffect(() => {
    initAnimations();
    
    // Animate contact info and form with delay
    animateElement(contactInfoRef.current, 'fadeInLeft', 300);
    animateElement(formContainerRef.current, 'fadeInRight', 500);
    
    // Animate form fields sequentially
    const formElements = form.current.querySelectorAll('.form-group');
    formElements.forEach((element, index) => {
      animateElement(element, 'fadeInUp', 600 + (index * 150));
    });
    
    // Animate social icons with bounce effect
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
      animateElement(icon, 'bounceIn', 1200 + (index * 100));
    });
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields.'
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please enter a valid email address.'
      });
      return;
    }
    
    // Set submitting state to show loading indicator
    setIsSubmitting(true);
    
    // Using EmailJS to send emails
    emailjs.sendForm(
      'service_ic368nn', 
      'template_dm2su6h',
      form.current,
      'vzrCFom8VVrwUL9Zl'
    )
    .then(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Your message has been sent! I will get back to you soon.'
      });
      
      // Animate success message
      const messageElement = document.querySelector('.form-message.success');
      if (messageElement) {
        animateElement(messageElement, 'pulse', 0);
      }
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, (error) => {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'There was an error sending your message. Please try again later.'
      });
      console.error('Email sending failed:', error);
      setIsSubmitting(false);
      
      // Animate error message
      const messageElement = document.querySelector('.form-message.error');
      if (messageElement) {
        animateElement(messageElement, 'shakeX', 0);
      }
    });
  };
  
  return (
    <div className="contact-page">
      <div className="page-header animate__animated animate__fadeIn">
        <h1>Contact Me</h1>
        <div className="breadcrumbs">Home / Contact</div>
      </div>
      
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-info animate__animated" ref={contactInfoRef}>
            <h2>Get In Touch</h2>
            <p>
              Have a project in mind or want to discuss opportunities? 
              Feel free to reach out using the form or my contact information below.
            </p>
            
            <div className="contact-methods">
              <div className="contact-method animate__animated animate__fadeInUp" style={{animationDelay: '300ms'}}>
                <div className="icon">📧</div>
                <div className="info">
                  <h3>Email</h3>
                  <p>pratikmhaske66@gmail.com</p>
                </div>
              </div>
              
              <div className="contact-method animate__animated animate__fadeInUp" style={{animationDelay: '500ms'}}>
                <div className="icon">📱</div>
                <div className="info">
                  <h3>Phone</h3>
                  <p>+91 9529214473</p>
                </div>
              </div>
              
              <div className="contact-method animate__animated animate__fadeInUp" style={{animationDelay: '700ms'}}>
                <div className="icon">📍</div>
                <div className="info">
                  <h3>Location</h3>
                  <p>wagholi,Pune-412207</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <h3>Connect With Me</h3>
              <div className="social-icons">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container animate__animated" ref={formContainerRef}>
            <form className="contact-form" ref={form} onSubmit={handleSubmit}>
              <h2>Send a Message</h2>
              
              {formStatus.submitted && (
                <div className={`form-message ${formStatus.success ? 'success' : 'error'} animate__animated`}>
                  {formStatus.message}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="input-animate"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  className="input-animate"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of your message"
                  className="input-animate"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="5"
                  className="input-animate"
                />
              </div>

              {/* Hidden field for recipient email - this is for EmailJS template */}
              <input 
                type="hidden" 
                name="to_email" 
                value="pratikmhaske66@gmail.com" 
              />
              
              <button 
                type="submit" 
                className="submit-button animate__animated animate__pulse animate__infinite" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 
                  <span className="loading-text">Sending <span className="dots">...</span></span> : 
                  'Send Message'
                }
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;