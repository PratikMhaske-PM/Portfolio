import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Filter, 
  Loader, 
  SortDesc, 
  SortAsc, 
  BookOpen
} from 'lucide-react';
import './Blog.css';

// Sample blog data - in a real app, this would come from an API
const blogPostsData = [
  {
    id: 1,
    title: 'How to Build Performant React Applications',
    excerpt: 'Learn the best practices for optimizing React applications and improving load times.',
    content: 'Full blog post content would go here...',
    date: '2023-03-15',
    category: 'React',
    tags: ['React', 'Performance', 'JavaScript'],
    author: 'Alex Dev',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Modern CSS Techniques Every Frontend Developer Should Know',
    excerpt: 'Explore the latest CSS features that can simplify your styling workflow.',
    content: 'Full blog post content would go here...',
    date: '2023-04-02',
    category: 'CSS',
    tags: ['CSS', 'Frontend', 'Web Design'],
    author: 'Sarah Styles',
    readTime: '7 min read'
  },
  {
    id: 3,
    title: 'Getting Started with TypeScript in React Projects',
    excerpt: 'A comprehensive guide to integrating TypeScript in your React applications.',
    content: 'Full blog post content would go here...',
    date: '2023-02-20',
    category: 'TypeScript',
    tags: ['TypeScript', 'React', 'JavaScript'],
    author: 'Michael Type',
    readTime: '10 min read'
  },
  {
    id: 4,
    title: 'State Management Solutions for React in 2023',
    excerpt: 'Compare different state management libraries and techniques for React applications.',
    content: 'Full blog post content would go here...',
    date: '2023-01-15',
    category: 'React',
    tags: ['React', 'State Management', 'Redux', 'Context API'],
    author: 'Alex Dev',
    readTime: '8 min read'
  },
  {
    id: 5,
    title: 'Building Accessible Web Applications',
    excerpt: 'Learn how to create inclusive web experiences that work for everyone.',
    content: 'Full blog post content would go here...',
    date: '2023-05-10',
    category: 'Accessibility',
    tags: ['Accessibility', 'Frontend', 'HTML', 'ARIA'],
    author: 'Jordan Access',
    readTime: '6 min read'
  }
];

function Blog() {
  // State management
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTags, setActiveTags] = useState([]);
  const postsPerPage = 3;

  // Extract all unique categories and tags
  const categories = useMemo(() => 
    ['All', ...new Set(blogPostsData.map(post => post.category))], 
    []
  );
  
  const allTags = useMemo(() => 
    [...new Set(blogPostsData.flatMap(post => post.tags))].sort(),
    []
  );

  // Check if any filters are applied
  const hasActiveFilters = useMemo(() => {
    return activeCategory !== 'All' || 
           searchTerm.trim() !== '' || 
           activeTags.length > 0 || 
           sortBy !== 'newest';
  }, [activeCategory, searchTerm, activeTags, sortBy]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...blogPostsData];

    // Category filter
    if (activeCategory !== 'All') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }

    // Search term filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term)) ||
        post.author.toLowerCase().includes(term)
      );
    }

    // Tags filter
    if (activeTags.length > 0) {
      filtered = filtered.filter(post => 
        activeTags.every(tag => post.tags.includes(tag))
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });

    return filtered;
  }, [activeCategory, searchTerm, activeTags, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  }, [filteredPosts, currentPage, postsPerPage]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm, activeTags, sortBy]);

  // Simulate loading data
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeCategory, searchTerm, currentPage, activeTags, sortBy]);

  // Handle tag toggle
  const toggleTag = (tag) => {
    setActiveTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle search with debounce
  const handleSearch = (e) => {
    const value = e.target.value;
    // Clear any existing timeout
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }
    // Set a new timeout
    window.searchTimeout = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };

  const handleClearFilters = () => {
    setActiveCategory('All');
    setSearchTerm('');
    setActiveTags([]);
    setSortBy('newest');
    setCurrentPage(1);
    
    // Also clear the search input field
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.value = '';
    }
  };

  return (
    <div className="blog-page">
      <header className="page-header">
        <div className="header-content">
          <BookOpen size={24} />
          <h1>Our Blog</h1>
        </div>
        <div className="breadcrumbs">
          <Link to="/">Home</Link> / <span>Blog</span>
        </div>
      </header>

      <section className="blog-filters">
        <div className="search-bar">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search articles..."
              defaultValue={searchTerm}
              onChange={handleSearch}
              aria-label="Search blog posts"
            />
          </div>
          {hasActiveFilters && (
            <button 
              className="clear-filters-btn"
              onClick={handleClearFilters}
              aria-label="Clear all filters"
            >
              <X size={16} /> Clear Filters
            </button>
          )}
        </div>

        <div className="filter-options">
          <div className="category-filters">
            <div className="filter-header">
              <Filter size={16} />
              <h3>Categories</h3>
            </div>
            <div className="categories-list">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-options">
            <label htmlFor="sort-select">
              {sortBy === 'newest' ? <SortDesc size={16} /> : <SortAsc size={16} />}
              Sort by:
            </label>
            <select 
              id="sort-select" 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort blog posts"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        <div className="tag-filters">
          <div className="filter-header">
            <Tag size={16} />
            <h3>Filter by Tags</h3>
          </div>
          <div className="tags-list">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-filter-btn ${activeTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
                aria-pressed={activeTags.includes(tag)}
              >
                <Tag size={12} />
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-summary">
          <p>
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
            {activeCategory !== 'All' && ` in ${activeCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
            {activeTags.length > 0 && ` with tags: ${activeTags.join(', ')}`}
          </p>
        </div>
      </section>

      <section className="blog-posts" aria-live="polite">
        {isLoading ? (
          <div className="loading-posts">
            <Loader size={32} className="loading-spinner" />
            <p>Loading posts...</p>
          </div>
        ) : currentPosts.length > 0 ? (
          currentPosts.map(post => (
            <article className="blog-card" key={post.id}>
              <div className="blog-card-header">
                <div className="blog-category-badge">
                  <BookOpen size={14} />
                  <span>{post.category}</span>
                </div>
              </div>

              <div className="blog-content">
                <h2 className="blog-title">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>

                <div className="blog-meta">
                  <div className="meta-item">
                    <Calendar size={14} />
                    <span className="blog-date">{formatDate(post.date)}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={14} />
                    <span className="blog-read-time">{post.readTime}</span>
                  </div>
                  <div className="meta-item">
                    <User size={14} />
                    <span className="blog-author">{post.author}</span>
                  </div>
                </div>

                <p className="blog-excerpt">{post.excerpt}</p>

                <div className="blog-tags">
                  {post.tags.map(tag => (
                    <button 
                      key={tag} 
                      className="blog-tag"
                      onClick={() => toggleTag(tag)}
                    >
                      <Tag size={12} />
                      <span>{tag}</span>
                    </button>
                  ))}
                </div>

                <div className="blog-footer">
                  <Link to={`/blog/${post.id}`} className="read-more-link" aria-label={`Read more about ${post.title}`}>
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="no-posts-found">
            <X size={32} />
            <h3>No blog posts found</h3>
            <p>Try adjusting your search or filter criteria.</p>
            <button 
              className="reset-filters-btn" 
              onClick={handleClearFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <nav className="blog-pagination" aria-label="Blog page navigation">
          <button
            className="pagination-btn prev"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            aria-label="Previous page"
          >
            <ArrowLeft size={16} /> Previous
          </button>
          
          <div className="pagination-numbers">
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              // Only show a window of pages around current page
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                    aria-label={`Page ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                (pageNum === currentPage - 2 && currentPage > 3) ||
                (pageNum === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return <span key={pageNum} className="pagination-ellipsis">...</span>;
              }
              return null;
            })}
          </div>
          
          <button
            className="pagination-btn next"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            aria-label="Next page"
          >
            Next <ArrowRight size={16} />
          </button>
        </nav>
      )}
    </div>
  );
}

export default Blog;