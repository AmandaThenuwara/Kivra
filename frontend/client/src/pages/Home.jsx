import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('You have been logged out successfully!');
  };

  const handleCategoryNavigation = (category) => {
    navigate(`/${category}`);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              {isAuthenticated ? (
                <>
                  Welcome to Your
                  <span className="gradient-text"> Style Journey</span>
                </>
              ) : (
                <>
                  Discover Your
                  <span className="gradient-text"> Perfect Style</span>
                </>
              )}
            </h1>
            <p className="hero-subtitle">
              {isAuthenticated ? (
                `Explore personalized recommendations and exclusive collections curated just for you, ${user.firstName || user.email.split('@')[0]}`
              ) : (
                "Explore our curated collection of premium clothing that defines modern elegance and sophistication"
              )}
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">
                {isAuthenticated ? 'Shop Your Style' : 'Shop Collection'}
              </button>
              <button className="btn-secondary">View Lookbook</button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-card men">
              <div className="category-overlay">
                <h3>Men's Collection</h3>
                <p>Sophisticated & Modern</p>
                <button 
                  className="category-btn"
                  onClick={() => handleCategoryNavigation('men')}
                >
                  Explore
                </button>
              </div>
            </div>
            <div className="category-card women">
              <div className="category-overlay">
                <h3>Women's Collection</h3>
                <p>Elegant & Chic</p>
                <button 
                  className="category-btn"
                  onClick={() => handleCategoryNavigation('women')}
                >
                  Explore
                </button>
              </div>
            </div>
            <div className="category-card accessories">
              <div className="category-overlay">
                <h3>Accessories</h3>
                <p>Perfect Finishing Touches</p>
                <button 
                  className="category-btn"
                  onClick={() => handleCategoryNavigation('accessories')}
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked pieces from our latest collection</p>
          </div>
          <div className="products-grid">
            {[
              { id: 1, name: 'Premium Silk Dress', category: 'Women\'s Wear', price: '$299.99', originalPrice: '$399.99', rating: 5, reviews: 124, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop&crop=center', isNew: true, discount: 25 },
              { id: 2, name: 'Luxury Wool Coat', category: 'Outerwear', price: '$499.99', originalPrice: '$699.99', rating: 5, reviews: 89, image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop&crop=center', isNew: true, discount: 29 },
              { id: 3, name: 'Designer Leather Shoes', category: 'Footwear', price: '$349.99', originalPrice: '$449.99', rating: 5, reviews: 67, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop&crop=center', isNew: true, discount: 22 },
              { id: 4, name: 'Cashmere Sweater', category: 'Knitwear', price: '$199.99', originalPrice: '$279.99', rating: 4, reviews: 156, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop&crop=center', isNew: true, discount: 29 }
            ].map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-overlay">
                    <button className="quick-view-btn">
                      <span className="btn-icon">👁️</span>
                      <span>QUICK VIEW</span>
                    </button>
                  </div>
                  <div className="product-badges">
                    {product.isNew && <div className="product-badge new-badge">NEW</div>}
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-header">
                    <p className="product-category">{product.category}</p>
                    <div className="product-rating">
                      <div className="stars">{'★'.repeat(product.rating)}{'☆'.repeat(5-product.rating)}</div>
                      <span className="rating-count">({product.reviews})</span>
                    </div>
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="current-price">{product.price}</span>
                    <span className="original-price">{product.originalPrice}</span>
                  </div>
                  <div className="product-actions">
                    <button className="product-action-btn view-details">
                      <span>View Details</span>
                      <span className="arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay in Style</h2>
            <p>Subscribe to get special offers, free giveaways, and insider updates on the latest fashion trends</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                aria-label="Email address for newsletter"
              />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="brand-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Born from a passion for timeless style and exceptional quality, Kivra represents 
                the perfect fusion of contemporary design and classic elegance. Each piece in our 
                collection is carefully crafted to empower your individual style journey and 
                celebrate the art of sophisticated fashion.
              </p>
              <div className="story-stats">
                <div className="stat">
                  <h3>50K+</h3>
                  <p>Happy Customers</p>
                </div>
                <div className="stat">
                  <h3>1500+</h3>
                  <p>Premium Products</p>
                </div>
                <div className="stat">
                  <h3>75+</h3>
                  <p>Countries Worldwide</p>
                </div>
              </div>
            </div>
            <div className="story-image">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=400&fit=crop&crop=center" alt="Our Story - Fashion boutique interior" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Complimentary shipping on orders over $200</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day hassle-free return policy</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Payment</h3>
              <p>Your payment information is safe and secure</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Premium Quality</h3>
              <p>Carefully curated products from top designers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;