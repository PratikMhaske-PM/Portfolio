/**
 * Animation.js - Handles animations for the About page
 */

// Initialize animations when component mounts
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
  
    // Start animating the skill bars when they come into view
    initSkillBarsAnimation();
  };
  
  // Animate an element with the specified animation and delay
  export const animateElement = (element, animationName, delay = 0) => {
    if (!element) return;
    
    // Set the animation delay
    element.style.animationDelay = `${delay}ms`;
    
    // Add the animation classes
    element.classList.add('animate__animated', `animate__${animationName}`);
    
    // Remove the animation classes after animation completes to allow re-animation
    const animationDuration = 1000; // Default animation duration in ms
    setTimeout(() => {
      element.classList.remove('animate__animated', `animate__${animationName}`);
      element.style.animationDelay = '';
    }, delay + animationDuration);
  };
  
  // Initialize scroll-triggered animations for the skill bars
  const initSkillBarsAnimation = () => {
    // Set up the intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const percentage = skillBar.getAttribute('data-progress');
          
          // Animate the width
          setTimeout(() => {
            skillBar.style.width = `${percentage}%`;
          }, 200);
          
          // Stop observing after animation
          observer.unobserve(skillBar);
        }
      });
    }, { threshold: 0.2 });
    
    // Observe all skill progress bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      observer.observe(bar);
    });
  };
  
  // Add scroll-triggered animations to elements
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
  
  // Add staggered animations to a group of elements
  export const addStaggeredAnimation = (selector, animationName, delayStep = 200) => {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = index * delayStep;
          animateElement(entry.target, animationName, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
      observer.observe(element);
    });
  };
  
  // Animate elements when they come into view
  export const initScrollAnimations = () => {
    // Timeline items fade in from left
    addStaggeredAnimation('.timeline-item', 'fadeInRight', 200);
    
    // Skill categories fade in from bottom
    addStaggeredAnimation('.skill-category', 'fadeInUp', 200);
    
    // Testimonials fade in from bottom
    addStaggeredAnimation('.testimonial', 'fadeInUp', 200);
    
    // Section titles fade in
    addScrollAnimation('.section-title', 'fadeIn');
  };