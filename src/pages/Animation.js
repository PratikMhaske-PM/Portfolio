// Animation.js - Utility functions for handling animations

/**
 * Initialize animations and required libraries
 */
export const initAnimations = () => {
    // Check if Animate.css is loaded
    const animateCSSLoaded = document.querySelector('link[href*="animate.css"]');
    
    // If not loaded, add it dynamically
    if (!animateCSSLoaded) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
      document.head.appendChild(link);
    }
  };
  
  /**
   * Animate an element with the specified animation and delay
   * @param {HTMLElement} element - The DOM element to animate
   * @param {string} animationName - The name of the animation from Animate.css
   * @param {number} delay - Delay in milliseconds before animation starts
   */
  export const animateElement = (element, animationName, delay = 0) => {
    if (!element) return;
    
    // Remove any existing animation classes
    element.classList.remove('animate__animated', `animate__${animationName}`);
    
    // Force a reflow to restart the animation
    void element.offsetWidth;
    
    // Set the animation delay
    element.style.animationDelay = `${delay}ms`;
    
    // Add the animation classes
    element.classList.add('animate__animated', `animate__${animationName}`);
    
    // Remove the animation classes after animation completes to allow for re-animation
    const animationDuration = 1000; // Default animation duration in ms
    setTimeout(() => {
      element.classList.remove('animate__animated', `animate__${animationName}`);
      element.style.animationDelay = '';
    }, delay + animationDuration);
  };
  
  /**
   * Add scroll-triggered animations to elements
   * @param {string} selector - CSS selector for elements to animate
   * @param {string} animationName - Animation name from Animate.css
   */
  export const addScrollAnimation = (selector, animationName) => {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateElement(entry.target, animationName);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    elements.forEach(element => {
      observer.observe(element);
    });
  };