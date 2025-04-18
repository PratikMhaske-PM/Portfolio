// pages/ProjectDetail.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetails.css';

// Import project images
import ecomImage from '../assets/E-com.png';
import portfolioImage from '../assets/Portfolio.png';

// Create a mapping for images
const imageMap = {
  ecomImage: ecomImage,
  portfolioImage: portfolioImage
};

// Limited dataset with just two showcase projects
const projectsData = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured online store with product listings, shopping cart, and secure checkout process.',
    longDescription: `This e-commerce platform was built to provide small businesses with an affordable yet powerful 
    solution for selling products online. The application features a responsive design that works across all devices,
    secure payment processing, inventory management, and a user-friendly admin dashboard.
    
    The biggest challenge was implementing a real-time inventory system that could handle multiple concurrent users
    while maintaining data consistency. This was solved using socket connections and a robust database design.`,
    image: 'ecomImage',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    features: [
      'User authentication and authorization',
      'Product catalog with filtering and search',
      'Shopping cart and wishlist functionality',
      'Secure checkout with multiple payment options',
      'Order tracking and history',
      'Admin dashboard for inventory management'
    ],
    liveLink: 'https://example.com/project1',
    githubLink: 'https://github.com/alexdev/project1',
    timeline: 'August 2022 - January 2023',
    role: 'Full Stack Developer',
    client: 'RetailTech Inc.'
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'A responsive personal portfolio website built with React and modern CSS techniques.',
    longDescription: `This portfolio website showcases my professional work and skills in a clean, modern design. The site
    features smooth animations, responsive layouts, and an intuitive user experience optimized for all devices.
    
    The key challenge was creating a unique visual identity while ensuring fast load times. This was achieved through 
    careful asset optimization, component lazy loading, and advanced CSS techniques for visual effects.
    
    The design philosophy focused on minimalism and functionality, creating a seamless user journey that highlights 
    projects while providing easy navigation and access to important information.`,
    image: 'portfolioImage',
    techStack: ['React', 'CSS', 'Framer Motion', 'GSAP'],
    features: [
      'Responsive design with mobile-first approach',
      'Smooth scroll animations and transitions',
      'Interactive project showcases',
      'Integrated contact form with validation',
      'Performance optimized image loading',
      'Dark/light mode with user preference detection'
    ],
    liveLink: 'https://example.com/project2',
    githubLink: 'https://github.com/alexdev/project2',
    timeline: 'September 2023 - October 2023',
    role: 'Designer and Developer',
    client: 'Personal Project'
  }
];

function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  
  // Refs for scrolling sections
  const imageRef = useRef(null);
  const overviewRef = useRef(null);
  const featuresRef = useRef(null);
  const relatedRef = useRef(null);
  
  // Setup intersection observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.dataset.section]: true
          }));
        }
      });
    }, observerOptions);
    
    // Observe all sections
    const sections = [imageRef, overviewRef, featuresRef, relatedRef];
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    return () => {
      sections.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [project]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProject = projectsData.find(p => p.id === parseInt(projectId));
    
    if (foundProject) {
      setProject(foundProject);
    }
    
    setLoading(false);
    
    // Reset visibility state when project changes
    setIsVisible({});
    
    // Scroll to top when project changes
    window.scrollTo(0, 0);
  }, [projectId]);
  
  if (loading) {
    return (
      <div className="loading">
        <div className="loader"></div>
        <p>Loading project details...</p>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="project-not-found">
        <h2>Project Not Found</h2>
        <p>The project you're looking for doesn't exist.</p>
        <Link to="/projects" className="back-button">Back to Projects</Link>
      </div>
    );
  }
  
  // Get the other project for related section
  const relatedProject = projectsData.find(p => p.id !== parseInt(projectId));
  
  return (
    <div className="project-detail-page">
      <div className="page-header">
        <div className="header-content">
          <h1>{project.title}</h1>
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / 
            <Link to="/projects">Projects</Link> / 
            <span>{project.title}</span>
          </div>
        </div>
      </div>
      
      <section 
        className={`project-showcase ${isVisible['image'] ? 'visible' : ''}`}
        ref={imageRef}
        data-section="image"
      >
        <div className="project-hero">
          <div className="project-image-container">
            <img 
              src={imageMap[project.image]} 
              alt={`${project.title} showcase`} 
              className="project-main-image"
            />
          </div>
        </div>
        
        <div className="project-info-sidebar">
          <div className="info-card">
            <div className="info-section">
              <h3>Timeline</h3>
              <p>{project.timeline}</p>
            </div>
            
            <div className="info-section">
              <h3>Role</h3>
              <p>{project.role}</p>
            </div>
            
            <div className="info-section">
              <h3>Client</h3>
              <p>{project.client}</p>
            </div>
            
            <div className="info-section">
              <h3>Technology Stack</h3>
              <div className="tech-tags">
                {project.techStack.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="project-links">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn primary-btn">
                <span className="btn-icon">🔗</span>
                <span className="btn-text">Live Demo</span>
              </a>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn secondary-btn">
                <span className="btn-icon">👨‍💻</span>
                <span className="btn-text">View Code</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <section 
        className={`project-description ${isVisible['overview'] ? 'visible' : ''}`}
        ref={overviewRef}
        data-section="overview"
      >
        <div className="section-title-container">
          <h2 className="section-title">Project Overview</h2>
          <div className="section-underline"></div>
        </div>
        <div className="description-content">
          <p>{project.longDescription}</p>
        </div>
      </section>
      
      <section 
        className={`project-features ${isVisible['features'] ? 'visible' : ''}`}
        ref={featuresRef}
        data-section="features"
      >
        <div className="section-title-container">
          <h2 className="section-title">Key Features</h2>
          <div className="section-underline"></div>
        </div>
        <ul className="features-list">
          {project.features.map((feature, index) => (
            <li key={index} className="feature-item">
              <div className="feature-icon">✓</div>
              <span className="feature-text">{feature}</span>
            </li>
          ))}
        </ul>
      </section>
      
      <section 
        className={`related-project-section ${isVisible['related'] ? 'visible' : ''}`}
        ref={relatedRef}
        data-section="related"
      >
        <div className="section-title-container">
          <h2 className="section-title">More Projects</h2>
          <div className="section-underline"></div>
        </div>
        <div className="related-project-container">
          <div className="related-project">
            <img 
              src={imageMap[relatedProject.image]} 
              alt={relatedProject.title} 
              className="related-project-image" 
            />
            <div className="related-project-info">
              <h3>{relatedProject.title}</h3>
              <p>{relatedProject.description}</p>
              <Link to={`/projects/${relatedProject.id}`} className="related-project-link">
                Explore Project <span className="arrow-icon">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <div className="back-link-container">
        <Link to="/projects" className="back-link">
          <span className="back-arrow">←</span> Back to All Projects
        </Link>
      </div>
    </div>
  );
}

export default ProjectDetail;