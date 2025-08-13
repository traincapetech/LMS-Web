import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addCourseToCart, forceScrollToTop, setupGlobalScrollToTop } from '../utils/cartUtils';
import '../App.css';

const BlenderCourses = () => {
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

  const blenderCourses = [
    {
      id: 1,
      title: "Complete Blender Creator: Learn 3D Modelling for Beginners",
      instructor: "GameDev.tv Team",
      rating: 4.8,
      students: 850000,
      price: 29.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      description: "Learn 3D modeling, animation, and rendering with Blender. Create stunning 3D art and animations from scratch.",
      duration: "52 hours",
      level: "Beginner",
      lastUpdated: "December 2024"
    },
    {
      id: 2,
      title: "Blender 3D: Your First 3D Animation",
      instructor: "Darrin Lile",
      rating: 4.7,
      students: 420000,
      price: 24.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      description: "Create your first 3D animation in Blender. Learn modeling, rigging, and animation fundamentals.",
      duration: "28 hours",
      level: "Beginner",
      lastUpdated: "November 2024"
    },
    {
      id: 3,
      title: "Blender 3D: Complete Training from Beginner to Advanced",
      instructor: "Darrin Lile",
      rating: 4.8,
      students: 680000,
      price: 34.99,
      originalPrice: 189.99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      description: "Master Blender from basics to advanced techniques. Learn modeling, texturing, lighting, and rendering.",
      duration: "45 hours",
      level: "All Levels",
      lastUpdated: "December 2024"
    },
    {
      id: 4,
      title: "Blender 3D: Create a Cartoon Character",
      instructor: "Darrin Lile",
      rating: 4.6,
      students: 320000,
      price: 19.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      description: "Design and model a complete cartoon character in Blender. Learn character design principles and 3D modeling.",
      duration: "22 hours",
      level: "Intermediate",
      lastUpdated: "October 2024"
    },
    {
      id: 5,
      title: "Blender 3D: Create a Sci-Fi Scene",
      instructor: "Darrin Lile",
      rating: 4.7,
      students: 280000,
      price: 24.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      description: "Build a complete sci-fi environment in Blender. Master environment modeling, texturing, and lighting.",
      duration: "26 hours",
      level: "Intermediate",
      lastUpdated: "December 2024"
    },
    {
      id: 6,
      title: "Blender 3D: Create a Low Poly Game Asset",
      instructor: "Darrin Lile",
      rating: 4.5,
      students: 180000,
      price: 19.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1555066931-4365d9bf0f0c?w=400&h=300&fit=crop",
      description: "Create game-ready low poly assets in Blender. Learn optimization techniques for game development.",
      duration: "18 hours",
      level: "Beginner",
      lastUpdated: "November 2024"
    }
  ];

  return (
    <div className="blender-courses-page">
      {/* Hero Section */}
      <section className="blender-hero">
        <div className="hero-content">
          <h1>Master Blender: Create Amazing 3D Art & Animations</h1>
          <p>Join over 2.9 million learners worldwide who are mastering Blender and bringing their creative visions to life</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">2.9M+</span>
              <span className="stat-label">Active Learners</span>
            </div>
            <div className="stat">
              <span className="stat-number">40+</span>
              <span className="stat-label">Expert Instructors</span>
            </div>
            <div className="stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">Course Hours</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" alt="Blender 3D" />
        </div>
      </section>

      {/* Why Learn Blender Section */}
      <section className="why-learn">
        <h2>Why Learn Blender in 2024?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🎨</div>
            <h3>Free & Powerful</h3>
            <p>Blender is completely free and rivals expensive 3D software like Maya and 3ds Max in capabilities.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💼</div>
            <h3>High Demand</h3>
            <p>3D artists are in high demand across gaming, film, advertising, and architectural visualization.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h3>Creative Freedom</h3>
            <p>Bring your imagination to life with unlimited creative possibilities in 3D space.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Industry Standard</h3>
            <p>Blender is used by major studios and is becoming an industry standard for 3D content creation.</p>
          </div>
        </div>
      </section>

      {/* Blender Applications */}
      <section className="blender-applications">
        <h2>What Can You Create with Blender?</h2>
        <div className="applications-grid">
          <div className="app-card">
            <div className="app-icon">🎮</div>
            <h3>Game Assets</h3>
            <p>Create 3D models, characters, environments, and animations for video games</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🎬</div>
            <h3>Film & Animation</h3>
            <p>Produce animated films, visual effects, and motion graphics for cinema</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🏗️</div>
            <h3>Architecture</h3>
            <p>Design and visualize buildings, interiors, and urban planning projects</p>
          </div>
          <div className="app-card">
            <div className="app-icon">📱</div>
            <h3>Product Design</h3>
            <p>Create 3D prototypes and visualizations for industrial and consumer products</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🎨</div>
            <h3>Digital Art</h3>
            <p>Express your creativity through 3D sculptures, concept art, and digital paintings</p>
          </div>
          <div className="app-card">
            <div className="app-icon">📺</div>
            <h3>Advertising</h3>
            <p>Create compelling 3D visuals for marketing campaigns and brand promotion</p>
          </div>
        </div>
      </section>

      {/* Blender Workflow */}
      <section className="blender-workflow">
        <h2>The Complete 3D Creation Workflow</h2>
        <div className="workflow-grid">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <h3>Modeling</h3>
            <p>Create 3D objects using polygonal modeling, sculpting, and procedural techniques</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">2</div>
            <h3>Texturing</h3>
            <p>Add colors, materials, and surface details to bring your models to life</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">3</div>
            <h3>Rigging</h3>
            <p>Create skeletons and control systems for character animation</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">4</div>
            <h3>Animation</h3>
            <p>Bring movement and life to your 3D objects and characters</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">5</div>
            <h3>Lighting</h3>
            <p>Set up lighting to create mood, atmosphere, and visual appeal</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">6</div>
            <h3>Rendering</h3>
            <p>Generate final images and animations with realistic or stylized rendering</p>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths">
        <h2>Choose Your Blender Learning Path</h2>
        <div className="paths-grid">
          <div className="path-card">
            <h3>🎨 3D Artist</h3>
            <p>Master modeling, texturing, and rendering for creating stunning 3D artwork</p>
            <span className="duration">12-16 weeks</span>
            <span className="level">Beginner</span>
          </div>
          <div className="path-card">
            <h3>🎬 Animator</h3>
            <p>Focus on character rigging, animation principles, and motion graphics</p>
            <span className="duration">16-20 weeks</span>
            <span className="level">Intermediate</span>
          </div>
          <div className="path-card">
            <h3>🎮 Game Developer</h3>
            <p>Create game assets, optimize models, and prepare content for game engines</p>
            <span className="duration">14-18 weeks</span>
            <span className="level">Intermediate</span>
          </div>
          <div className="path-card">
            <h3>🏗️ Architectural Visualizer</h3>
            <p>Master architectural modeling, lighting, and photorealistic rendering</p>
            <span className="duration">10-14 weeks</span>
            <span className="level">Intermediate</span>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <h2>Top-Rated Blender Courses</h2>
        <div className="courses-grid">
          {blenderCourses.map((course) => (
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

      {/* Blender Features */}
      <section className="blender-features">
        <h2>Powerful Features You'll Master</h2>
        <div className="features-grid">
          <div className="feature-category">
            <h3>Modeling Tools</h3>
            <div className="feature-items">
              <span className="feature-item">Polygonal Modeling</span>
              <span className="feature-item">Sculpting</span>
              <span className="feature-item">Boolean Operations</span>
              <span className="feature-item">Modifiers</span>
              <span className="feature-item">Retopology</span>
              <span className="feature-item">Curves & Surfaces</span>
            </div>
          </div>
          <div className="feature-category">
            <h3>Texturing & Materials</h3>
            <div className="feature-items">
              <span className="feature-item">UV Mapping</span>
              <span className="feature-item">Procedural Textures</span>
              <span className="feature-item">PBR Materials</span>
              <span className="feature-item">Texture Painting</span>
              <span className="feature-item">Material Nodes</span>
              <span className="feature-item">Baking</span>
            </div>
          </div>
          <div className="feature-category">
            <h3>Animation & Rigging</h3>
            <div className="feature-items">
              <span className="feature-item">Armature Rigging</span>
              <span className="feature-item">Weight Painting</span>
              <span className="feature-item">Keyframe Animation</span>
              <span className="feature-item">Shape Keys</span>
              <span className="feature-item">Constraints</span>
              <span className="feature-item">Drivers</span>
            </div>
          </div>
          <div className="feature-category">
            <h3>Rendering & Compositing</h3>
            <div className="feature-items">
              <span className="feature-item">Cycles Renderer</span>
              <span className="feature-item">Eevee Real-time</span>
              <span className="feature-item">Compositing Nodes</span>
              <span className="feature-item">Motion Blur</span>
              <span className="feature-item">Depth of Field</span>
              <span className="feature-item">Volumetrics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <h2>Success Stories from Blender Learners</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Mike S." />
            </div>
            <div className="story-content">
              <p>"Started with Blender basics, now working as a 3D artist at a major game studio!"</p>
              <h4>Mike S.</h4>
              <span>3D Artist</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Emma L." />
            </div>
            <div className="story-content">
              <p>"Blender helped me create stunning architectural visualizations for my clients!"</p>
              <h4>Emma L.</h4>
              <span>Architectural Visualizer</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="David K." />
            </div>
            <div className="story-content">
              <p>"From hobbyist to professional animator. Blender opened so many creative doors!"</p>
              <h4>David K.</h4>
              <span>3D Animator</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Create in 3D?</h2>
          <p>Join millions of artists and bring your creative vision to life with Blender</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={handleBrowseAllCourses}>Browse All Blender Courses</button>
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

export default BlenderCourses;
