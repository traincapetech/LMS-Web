// Cart utility functions
export const addToCart = (item) => {
  try {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex !== -1) {
      // Item already exists, show message
      const itemType = item.type === 'subscription' ? 'subscription plan' : 'course';
      alert(`This ${itemType} is already in your cart!`);
      return false;
    }
    
    // Ensure all necessary information is captured
    const cartItem = {
      ...item,
      addedAt: new Date().toISOString(),
      cartId: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    
    // Add item to cart
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success message with item details
    const itemType = item.type === 'subscription' ? 'subscription plan' : 'course';
    const priceInfo = item.price ? ` (₹${item.price})` : '';
    alert(`"${item.title || item.name}" has been added to your cart!${priceInfo} 🛒`);
    
    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('Error adding item to cart. Please try again.');
    return false;
  }
};

// Enhanced function specifically for adding subscription plans
export const addSubscriptionToCart = (subscriptionPlan) => {
  try {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if subscription already exists in cart
    const existingIndex = existingCart.findIndex(item => 
      item.id === subscriptionPlan.id || 
      (item.type === 'subscription' && item.name === subscriptionPlan.name)
    );
    
    if (existingIndex !== -1) {
      alert(`${subscriptionPlan.name} is already in your cart! ✅`);
      return false;
    }
    
    // Create subscription cart item with all necessary information
    const subscriptionItem = {
      ...subscriptionPlan,
      type: 'subscription',
      addedAt: new Date().toISOString(),
      cartId: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      // Ensure price is captured
      price: subscriptionPlan.price || 0,
      // Ensure all features are captured
      features: subscriptionPlan.features || [],
      // Ensure description is captured
      description: subscriptionPlan.description || subscriptionPlan.name
    };
    
    // Add to cart
    existingCart.push(subscriptionItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success message with subscription details
    const priceInfo = subscriptionPlan.price ? ` (₹${subscriptionPlan.price}/month)` : '';
    alert(`${subscriptionPlan.name} added to cart!${priceInfo} 🛒`);
    
    return true;
  } catch (error) {
    console.error('Error adding subscription to cart:', error);
    alert('Error adding subscription to cart. Please try again.');
    return false;
  }
};

// Enhanced function for adding courses with complete information
export const addCourseToCart = (course) => {
  try {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if course already exists in cart
    const existingIndex = existingCart.findIndex(item => 
      item.id === course.id || 
      (item.type === 'course' && item.title === course.title)
    );
    
    if (existingIndex !== -1) {
      alert(`"${course.title}" is already in your cart! ✅`);
      return false;
    }
    
    // Create course cart item with all necessary information
    const courseItem = {
      ...course,
      type: 'course',
      addedAt: new Date().toISOString(),
      cartId: `course_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      // Ensure price is captured
      price: course.price || 0,
      // Ensure all course details are captured
      instructor: course.instructor || 'Unknown Instructor',
      duration: course.duration || 'Unknown Duration',
      level: course.level || 'All Levels',
      rating: course.rating || 0,
      students: course.students || 0,
      lastUpdated: course.lastUpdated || 'Unknown'
    };
    
    // Add to cart
    existingCart.push(courseItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success message with course details
    const priceInfo = course.price ? ` (₹${course.price})` : '';
    alert(`"${course.title}" has been added to your cart!${priceInfo} 🛒`);
    
    return true;
  } catch (error) {
    console.error('Error adding course to cart:', error);
    alert('Error adding course to cart. Please try again.');
    return false;
  }
};

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (error) {
    console.error('Error getting cart:', error);
    return [];
  }
};

export const removeFromCart = (courseId) => {
  try {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = existingCart.filter(item => item.id !== courseId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return false;
  }
};

export const clearCart = () => {
  try {
    localStorage.removeItem('cart');
    return true;
  } catch (error) {
    console.error('Error clearing cart:', error);
    return false;
  }
};

// Enhanced Scroll to top utility - More reliable across browsers
export const scrollToTop = () => {
  // Try multiple methods for better browser compatibility
  try {
    // Method 1: Modern browsers with smooth scrolling
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      // Method 2: Fallback for older browsers
      window.scrollTo(0, 0);
    }
    
    // Method 3: Also try scrolling the document element
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    
    // Method 4: Try scrolling the body
    if (document.body) {
      document.body.scrollTop = 0;
    }
    
    // Method 5: Force immediate scroll for stubborn cases
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    }, 100);
    
  } catch (error) {
    console.error('Error scrolling to top:', error);
    // Fallback: try basic scroll
    try {
      window.scrollTo(0, 0);
    } catch (fallbackError) {
      console.error('Fallback scroll also failed:', fallbackError);
    }
  }
};

// Navigation utility with scroll to top
export const navigateWithScrollToTop = (navigate, path) => {
  scrollToTop();
  navigate(path);
};

// Force scroll to top immediately (for navigation links)
export const forceScrollToTop = () => {
  try {
    // Immediate scroll without smooth behavior
    window.scrollTo(0, 0);
    
    // Also try scrolling document elements
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
    
    // Force scroll after a tiny delay
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
    
    // Additional force scroll after a longer delay
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    }, 100);
    
  } catch (error) {
    console.error('Error in force scroll to top:', error);
  }
};

// Global scroll to top effect - call this in useEffect
export const setupGlobalScrollToTop = () => {
  // Listen for route changes
  const handleRouteChange = () => {
    setTimeout(() => {
      forceScrollToTop();
    }, 100);
  };

  // Listen for popstate (back/forward navigation)
  window.addEventListener('popstate', handleRouteChange);
  
  // Listen for hash changes
  window.addEventListener('hashchange', handleRouteChange);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('popstate', handleRouteChange);
    window.removeEventListener('hashchange', handleRouteChange);
  };
};

// Enhanced scroll to top with visual feedback
export const scrollToTopWithFeedback = () => {
  // Add a visual indicator that scroll is happening
  const scrollIndicator = document.createElement('div');
  scrollIndicator.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    z-index: 10000;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    animation: slideInRight 0.3s ease-out;
  `;
  scrollIndicator.textContent = 'Scrolling to top...';
  
  // Add animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // Add to page
  document.body.appendChild(scrollIndicator);
  
  // Scroll to top
  forceScrollToTop();
  
  // Remove indicator after 2 seconds
  setTimeout(() => {
    if (scrollIndicator.parentNode) {
      scrollIndicator.parentNode.removeChild(scrollIndicator);
    }
  }, 2000);
};

// Debug function to display cart contents
export const debugCart = () => {
  try {
    const cart = getCart();
    console.log('🛒 Current Cart Contents:', cart);
    console.log('📊 Cart Summary:', {
      totalItems: cart.length,
      courses: cart.filter(item => item.type === 'course').length,
      subscriptions: cart.filter(item => item.type === 'subscription').length,
      totalValue: cart.reduce((sum, item) => sum + (item.price || 0), 0)
    });
    return cart;
  } catch (error) {
    console.error('Error debugging cart:', error);
    return [];
  }
};

// Get cart summary information
export const getCartSummary = () => {
  try {
    const cart = getCart();
    const courses = cart.filter(item => item.type === 'course');
    const subscriptions = cart.filter(item => item.type === 'subscription');
    
    return {
      totalItems: cart.length,
      courses: courses.length,
      subscriptions: subscriptions.length,
      totalValue: cart.reduce((sum, item) => sum + (item.price || 0), 0),
      courseValue: courses.reduce((sum, item) => sum + (item.price || 0), 0),
      subscriptionValue: subscriptions.reduce((sum, item) => sum + (item.price || 0), 0)
    };
  } catch (error) {
    console.error('Error getting cart summary:', error);
    return {
      totalItems: 0,
      courses: 0,
      subscriptions: 0,
      totalValue: 0,
      courseValue: 0,
      subscriptionValue: 0
    };
  }
};
