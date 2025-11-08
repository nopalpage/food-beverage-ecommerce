// Utility functions for the application

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

// Format date and time
export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

// Generate unique ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number
export const validatePhone = (phone) => {
  const re = /^\+?[\d\s\-\(\)]+$/;
  return re.test(phone);
};

// Validate credit card number
export const validateCardNumber = (cardNumber) => {
  const re = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
  return re.test(cardNumber.replace(/\s/g, ''));
};

// Validate expiry date
export const validateExpiryDate = (expiryDate) => {
  const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return re.test(expiryDate);
};

// Validate CVV
export const validateCVV = (cvv) => {
  const re = /^\d{3,4}$/;
  return re.test(cvv);
};

// Calculate tax
export const calculateTax = (amount, taxRate = 0.08) => {
  return amount * taxRate;
};

// Calculate shipping cost
export const calculateShipping = (subtotal, freeShippingThreshold = 50) => {
  return subtotal >= freeShippingThreshold ? 0 : 5.99;
};

// Calculate total with tax and shipping
export const calculateTotal = (subtotal, taxRate = 0.08, freeShippingThreshold = 50) => {
  const tax = calculateTax(subtotal, taxRate);
  const shipping = calculateShipping(subtotal, freeShippingThreshold);
  return subtotal + tax + shipping;
};

// Local storage helpers
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Cart helpers
export const cartHelpers = {
  addItem: (cart, product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      return cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...cart, { ...product, quantity: 1 }];
    }
  },
  
  removeItem: (cart, productId) => {
    return cart.filter(item => item.id !== productId);
  },
  
  updateQuantity: (cart, productId, quantity) => {
    if (quantity <= 0) {
      return cartHelpers.removeItem(cart, productId);
    }
    
    return cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
  },
  
  getTotal: (cart) => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  
  getItemCount: (cart) => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
};

// Image helpers
export const imageHelpers = {
  getPlaceholderImage: (width = 300, height = 200) => {
    return `https://via.placeholder.com/${width}x${height}?text=Product+Image`;
  },
  
  getImageUrl: (imagePath, fallback = null) => {
    if (!imagePath) {
      return fallback || imageHelpers.getPlaceholderImage();
    }
    
    // Handle different image URL formats
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Handle relative paths
    return imagePath;
  }
};

// Animation helpers
export const animationHelpers = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  }
};

// SEO helpers
export const seoHelpers = {
  generateMetaTags: (title, description, image = null) => {
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: image ? [image] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : [],
      }
    };
  }
};

// Performance helpers
export const performanceHelpers = {
  // Lazy load images
  lazyLoadImages: () => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  },
  
  // Preload critical resources
  preloadResources: (resources) => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });
  }
};