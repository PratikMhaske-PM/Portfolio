// pages/Projects.js
import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';

// Import all project thumbnail images
import ecomImage from '../assets/E-com.png';
import taskManagerImage from '../assets/Task.png';
import weatherDashboardImage from '../assets/Whether.png';
import portfolioImage from '../assets/Portfolio.png';
import fitnessTrackerImage from '../assets/Fitness.png';
import cmsImage from '../assets/Content.png';

// Mock project data - in a real app, you might fetch this from an API
const projectsData = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured online store with product listings, shopping cart, and secure checkout process.',
    thumbnail: ecomImage,
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    liveLink: 'https://example.com/project1',
    githubLink: 'https://github.com/alexdev/project1',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A productivity tool for organizing tasks with drag-and-drop functionality and team collaboration features.',
    thumbnail: taskManagerImage,
    techStack: ['React', 'Redux', 'Firebase'],
    liveLink: 'https://example.com/project2',
    githubLink: 'https://github.com/alexdev/project2',
    featured: true
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather information application with interactive maps and 5-day forecasts.',
    thumbnail: weatherDashboardImage,
    techStack: ['JavaScript', 'HTML/CSS', 'Weather API'],
    liveLink: 'https://example.com/project3',
    githubLink: 'https://github.com/alexdev/project3',
    featured: false
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A responsive personal portfolio website built with React and modern CSS techniques.',
    thumbnail: portfolioImage,
    techStack: ['React', 'CSS', 'Framer Motion'],
    liveLink: 'https://example.com/project4',
    githubLink: 'https://github.com/alexdev/project4',
    featured: false
  },
  {
    id: 5,
    title: 'Fitness Tracker',
    description: 'A mobile-first application for tracking workouts and nutrition with progress visualization.',
    thumbnail: fitnessTrackerImage,
    techStack: ['React Native', 'GraphQL', 'Node.js'],
    liveLink: 'https://example.com/project5',
    githubLink: 'https://github.com/alexdev/project5',
    featured: false
  },
  {
    id: 6,
    title: 'Content Management System',
    description: 'A custom CMS solution for managing digital content with user roles and permissions.',
    thumbnail: cmsImage,
    techStack: ['React', 'Node.js', 'MySQL'],
    liveLink: 'https://example.com/project6',
    githubLink: 'https://github.com/alexdev/project6',
    featured: true
  }
];

function Projects() {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState(projectsData);
  const [displayMode, setDisplayMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('all');
  
  // Get unique tech stack items for filter buttons
  const allTechnologies = ['All', ...new Set(projectsData.flatMap(project => project.techStack))];

  // Filter projects based on tech stack, search term, and view (all/featured)
  useEffect(() => {
    let filteredProjects = projectsData;
    
    // Filter by tech stack
    if (filter !== 'All') {
      filteredProjects = filteredProjects.filter(project => 
        project.techStack.includes(filter)
      );
    }
    
    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term) ||
        project.techStack.some(tech => tech.toLowerCase().includes(term))
      );
    }
    
    // Filter by view (all/featured)
    if (currentView === 'featured') {
      filteredProjects = filteredProjects.filter(project => project.featured);
    }
    
    setProjects(filteredProjects);
  }, [filter, searchTerm, currentView]);
  
  const handleFilterChange = (tech) => {
    setFilter(tech);
  };

  const toggleDisplayMode = () => {
    setDisplayMode(displayMode === 'grid' ? 'list' : 'grid');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Toggle dark/light mode
  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
  };
  
  // Fallback image handler for missing thumbnails
  const handleImageError = (e) => {
    e.target.src = '/api/placeholder/400/300';
    e.target.alt = 'Project thumbnail placeholder';
  };

  // Intersection Observer setup for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once the animation has played, no need to observe anymore
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Select all project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      observer.observe(card);
    });

    return () => {
      projectCards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, [projects]); // Re-run when projects change due to filtering
  
  return (
    <div className="projects-page">
      <div className="page-header">
        <div className="header-content">
          <h1>My Projects</h1>
          <div className="breadcrumbs">Home / Projects</div>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark/light mode">
          <span className="light-icon">☀️</span>
          <span className="dark-icon">🌙</span>
        </button>
      </div>
      
      <section className="projects-controls">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <div className="view-options">
          <button 
            className={`view-btn ${currentView === 'all' ? 'active' : ''}`}
            onClick={() => handleViewChange('all')}
          >
            All Projects
          </button>
          <button 
            className={`view-btn ${currentView === 'featured' ? 'active' : ''}`}
            onClick={() => handleViewChange('featured')}
          >
            Featured
          </button>
          <button className="display-toggle" onClick={toggleDisplayMode}>
            {displayMode === 'grid' ? 'List View' : 'Grid View'}
          </button>
        </div>
      </section>
      
      <section className="projects-filter">
        <div className="filter-buttons">
          {allTechnologies.map(tech => (
            <button 
              key={tech} 
              className={`filter-btn ${filter === tech ? 'active' : ''}`}
              onClick={() => handleFilterChange(tech)}
            >
              {tech}
            </button>
          ))}
        </div>
      </section>
      
      <section className={`projects-container ${displayMode}`}>
        {projects.length > 0 ? (
          projects.map(project => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img 
                  src={project.thumbnail} 
                  alt={`${project.title} thumbnail`} 
                  onError={handleImageError}
                />
                {project.featured && <span className="featured-badge">Featured</span>}
                <div className="project-overlay">
                  <Link to={`/projects/${project.id}`} className="view-details-btn">View Details</Link>
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-tags">
                  {project.techStack.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link live-link">
                    <span className="link-icon">🔗</span> Live Demo
                  </a>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link github-link">
                    <span className="link-icon">📁</span> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-projects">
            <p>No projects found with the current filters.</p>
            <button className="reset-btn" onClick={() => {
              setFilter('All');
              setSearchTerm('');
              setCurrentView('all');
            }}>Reset Filters</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Projects;