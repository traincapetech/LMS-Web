import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addCourseToCart, forceScrollToTop, setupGlobalScrollToTop } from '../utils/cartUtils';
import '../App.css';

const GraphicDesignCourses = () => {
  const navigate = useNavigate();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const cleanup = setupGlobalScrollToTop();
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      cleanup();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAddToCart = (course) => {
    addCourseToCart(course);
  };

  const handleBrowseAllCourses = () => {
    forceScrollToTop();
    navigate('/courses');
  };

  const handleGetFreeTrial = () => {
    forceScrollToTop();
    navigate('/signup');
  };

  const handleLinkClick = () => {
    forceScrollToTop();
  };

  const handleScrollToTop = () => {
    forceScrollToTop();
  };

  const graphicDesignCourses = [
    {
      id: 1,
      title: "Graphic Design Masterclass: Learn GREAT Design",
      instructor: "Lindsay Marsh",
      rating: 4.8,
      students: 1200000,
      price: 29.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      description: "Master graphic design fundamentals, typography, color theory, and create stunning visual designs.",
      duration: "42 hours",
      level: "Beginner",
      lastUpdated: "December 2024"
    },
    {
      id: 2,
      title: "Adobe Photoshop CC - Essentials Training Course",
      instructor: "Daniel Walter Scott",
      rating: 4.7,
      students: 950000,
      price: 24.99,
      originalPrice: 189.99,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      description: "Learn Photoshop from scratch. Master photo editing, retouching, and digital art creation.",
      duration: "38 hours",
      level: "Beginner",
      lastUpdated: "November 2024"
    },
    {
      id: 3,
      title: "Adobe Illustrator CC - Essentials Training Course",
      instructor: "Daniel Walter Scott",
      rating: 4.8,
      students: 680000,
      price: 24.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      description: "Master vector graphics with Illustrator. Create logos, icons, and scalable illustrations.",
      duration: "35 hours",
      level: "Beginner",
      lastUpdated: "December 2024"
    },
    {
      id: 4,
      title: "Logo Design Masterclass: Learn Logo Design and Illustrator",
      instructor: "Lindsay Marsh",
      rating: 4.6,
      students: 420000,
      price: 19.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      description: "Design professional logos and brand identities. Master logo design principles and techniques.",
      duration: "28 hours",
      level: "Intermediate",
      lastUpdated: "October 2024"
    },
    {
      id: 5,
      title: "Canva Masterclass: Design Like a Pro",
      instructor: "Sarah Stebbins",
      rating: 4.7,
      students: 380000,
      price: 19.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      description: "Master Canva for social media, marketing, and business design. No design experience needed.",
      duration: "22 hours",
      level: "Beginner",
      lastUpdated: "December 2024"
    },
    {
      id: 6,
      title: "Typography Masterclass: Working with Type in Design",
      instructor: "Lindsay Marsh",
      rating: 4.5,
      students: 280000,
      price: 19.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1555066931-4365d9bf0f0c?w=400&h=300&fit=crop",
      description: "Master typography fundamentals, font selection, and text layout for professional designs.",
      duration: "18 hours",
      level: "Intermediate",
      lastUpdated: "November 2024"
    }
  ];

  return (
    <div className="graphicdesign-courses-page">
      {/* Hero Section */}
      <section className="graphicdesign-hero">
        <div className="hero-content">
          <h1>Master Graphic Design: Create Stunning Visual Experiences</h1>
          <p>Join over 4.5 million learners worldwide who are mastering graphic design and visual communication</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">4.5M+</span>
              <span className="stat-label">Active Learners</span>
            </div>
            <div className="stat">
              <span className="stat-number">70+</span>
              <span className="stat-label">Expert Instructors</span>
            </div>
            <div className="stat">
              <span className="stat-number">300+</span>
              <span className="stat-label">Course Hours</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" alt="Graphic Design" />
        </div>
      </section>

      {/* Why Learn Graphic Design Section */}
      <section className="why-learn">
        <h2>Why Learn Graphic Design in 2024?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">💼</div>
            <h3>High Demand</h3>
            <p>Graphic designers are needed in every industry - from marketing to tech, healthcare to entertainment.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h3>Creative Freedom</h3>
            <p>Express your creativity and bring ideas to life through visual communication and design.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Great Income</h3>
            <p>Graphic designers earn competitive salaries with opportunities for freelance and remote work.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Global Opportunities</h3>
            <p>Work with clients worldwide and create designs that reach millions of people.</p>
          </div>
        </div>
      </section>

      {/* Graphic Design Applications */}
      <section className="graphicdesign-applications">
        <h2>What Can You Create with Graphic Design?</h2>
        <div className="applications-grid">
          <div className="app-card">
            <div className="app-icon">🏢</div>
            <h3>Brand Identity</h3>
            <p>Design logos, business cards, and complete brand identity systems</p>
          </div>
          <div className="app-card">
            <div className="app-icon">📱</div>
            <h3>Digital Marketing</h3>
            <p>Create social media graphics, email templates, and digital advertisements</p>
          </div>
          <div className="app-card">
            <div className="app-icon">📰</div>
            <h3>Print Design</h3>
            <p>Design brochures, flyers, posters, and other printed materials</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🎨</div>
            <h3>Web Design</h3>
            <p>Create website layouts, user interfaces, and digital experiences</p>
          </div>
          <div className="app-card">
            <div className="app-icon">📚</div>
            <h3>Publication Design</h3>
            <p>Design books, magazines, and editorial layouts</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🎭</div>
            <h3>Packaging Design</h3>
            <p>Create product packaging and retail displays</p>
          </div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="design-principles">
        <h2>Core Design Principles You'll Master</h2>
        <div className="principles-grid">
          <div className="principle-card">
            <div className="principle-icon">⚖️</div>
            <h3>Balance</h3>
            <p>Create visual equilibrium through symmetrical, asymmetrical, and radial balance</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">🎯</div>
            <h3>Hierarchy</h3>
            <p>Guide the viewer's eye through visual importance and information organization</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">🔄</div>
            <h3>Repetition</h3>
            <p>Use consistent elements to create unity and strengthen brand recognition</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">📏</div>
            <h3>Alignment</h3>
            <p>Create order and organization through proper element positioning</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">🎨</div>
            <h3>Contrast</h3>
            <p>Make elements stand out and create visual interest through differences</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">📐</div>
            <h3>Proximity</h3>
            <p>Group related elements together to show relationships and improve readability</p>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths">
        <h2>Choose Your Graphic Design Path</h2>
        <div className="paths-grid">
          <div className="path-card">
            <h3>🎨 Visual Designer</h3>
            <p>Master design fundamentals, typography, and visual communication principles</p>
            <span className="duration">8-12 weeks</span>
            <span className="level">Beginner</span>
          </div>
          <div className="path-card">
            <h3>🏢 Brand Designer</h3>
            <p>Specialize in logo design, brand identity, and corporate design systems</p>
            <span className="duration">12-16 weeks</span>
            <span className="level">Intermediate</span>
          </div>
          <div className="path-card">
            <h3>📱 Digital Designer</h3>
            <p>Focus on web design, UI/UX, and digital marketing graphics</p>
            <span className="duration">10-14 weeks</span>
            <span className="level">Intermediate</span>
          </div>
          <div className="path-card">
            <h3>📰 Print Designer</h3>
            <p>Master traditional print design, layout, and production techniques</p>
            <span className="duration">8-12 weeks</span>
            <span className="level">Intermediate</span>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <h2>Top-Rated Graphic Design Courses</h2>
        <div className="courses-grid">
          {graphicDesignCourses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-overlay">
                  <button className="preview-btn">Preview</button>
                </div>
              </div>
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-instructor">by {course.instructor}</p>
                <div className="course-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-number">{course.rating}</span>
                  <span className="students">({course.students.toLocaleString()})</span>
                </div>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <span className="duration">{course.duration}</span>
                  <span className="level">{course.level}</span>
                  <span className="updated">Updated {course.lastUpdated}</span>
                </div>
                <div className="course-pricing">
                  <span className="current-price">${course.price}</span>
                  <span className="original-price">${course.originalPrice}</span>
                  <span className="discount">{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off</span>
                </div>
                <button className="enroll-btn" onClick={() => handleAddToCart(course)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Design Tools */}
      <section className="design-tools">
        <h2>Professional Design Tools You'll Master</h2>
        <div className="tools-grid">
          <div className="tool-category">
            <h3>Adobe Creative Suite</h3>
            <div className="tool-items">
              <span className="tool-item">Photoshop - Photo editing</span>
              <span className="tool-item">Illustrator - Vector graphics</span>
              <span className="tool-item">InDesign - Layout design</span>
              <span className="tool-item">XD - UI/UX design</span>
              <span className="tool-item">After Effects - Motion graphics</span>
            </div>
          </div>
          <div className="tool-category">
            <h3>Alternative Tools</h3>
            <div className="tool-items">
              <span className="tool-item">Canva - Online design</span>
              <span className="tool-item">Figma - Collaborative design</span>
              <span className="tool-item">Sketch - Mac design</span>
              <span className="tool-item">Affinity Designer - Vector design</span>
              <span className="tool-item">Procreate - Digital drawing</span>
            </div>
          </div>
          <div className="tool-category">
            <h3>Design Resources</h3>
            <div className="tool-items">
              <span className="tool-item">Unsplash - Stock photos</span>
              <span className="tool-item">Google Fonts - Typography</span>
              <span className="tool-item">Color Hunt - Color palettes</span>
              <span className="tool-item">Icons8 - Icon sets</span>
              <span className="tool-item">Behance - Inspiration</span>
            </div>
          </div>
          <div className="tool-category">
            <h3>File Formats</h3>
            <div className="tool-items">
              <span className="tool-item">AI - Illustrator files</span>
              <span className="tool-item">PSD - Photoshop files</span>
              <span className="tool-item">EPS - Vector files</span>
              <span className="tool-item">PDF - Print files</span>
              <span className="tool-item">SVG - Web graphics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <h2>Success Stories from Graphic Design Learners</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Jessica M." />
            </div>
            <div className="story-content">
              <p>"Started with basic design skills, now running my own successful design agency!"</p>
              <h4>Jessica M.</h4>
              <span>Design Agency Owner</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Alex R." />
            </div>
            <div className="story-content">
              <p>"Graphic design skills helped me land a dream job at a top tech company!"</p>
              <h4>Alex R.</h4>
              <span>UI/UX Designer</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Sarah K." />
            </div>
            <div className="story-content">
              <p>"From hobby to profitable freelance business. Design skills changed my life!"</p>
              <h4>Sarah K.</h4>
              <span>Freelance Designer</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Create Amazing Designs?</h2>
          <p>Join millions of designers and bring your creative vision to life</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={handleBrowseAllCourses}>Browse All Design Courses</button>
            <button className="secondary-btn" onClick={handleGetFreeTrial}>Get Free Trial</button>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="footer-nav">
        <div className="nav-links">
          <Link to="/" className="nav-link" onClick={handleLinkClick}>← Back to Home</Link>
          <Link to="/courses" className="nav-link" onClick={handleLinkClick}>Browse All Courses</Link>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        className={`scroll-to-top-btn ${showScrollToTop ? 'visible' : ''}`}
        onClick={handleScrollToTop}
        title="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
};

export default GraphicDesignCourses;
