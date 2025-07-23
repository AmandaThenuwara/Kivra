import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Discover Your
              <span className="gradient-text"> Perfect Style</span>
            </h1>
            <p className="hero-subtitle">
              Explore our curated collection of premium clothing that defines modern elegance
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">Shop Collection</button>
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
                <button className="category-btn">Explore</button>
              </div>
            </div>
            <div className="category-card women">
              <div className="category-overlay">
                <h3>Women's Collection</h3>
                <p>Elegant & Chic</p>
                <button className="category-btn">Explore</button>
              </div>
            </div>
            <div className="category-card accessories">
              <div className="category-overlay">
                <h3>Accessories</h3>
                <p>Perfect Finishing Touches</p>
                <button className="category-btn">Explore</button>
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
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="product-card">
                <div className="product-image">
                  <img src={`/api/placeholder/300/400`} alt={`Product ${item}`} />
                  <div className="product-overlay">
                    <button className="quick-view-btn">Quick View</button>
                    <button className="add-to-cart-btn">Add to Cart</button>
                  </div>
                  <div className="product-badge">New</div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">Premium T-Shirt</h3>
                  <p className="product-category">Casual Wear</p>
                  <div className="product-price">
                    <span className="current-price">$49.99</span>
                    <span className="original-price">$69.99</span>
                  </div>
                  <div className="product-rating">
                    <div className="stars">★★★★★</div>
                    <span className="rating-count">(124)</span>
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
            <p>Subscribe to get special offers, free giveaways, and insider updates</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
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
                collection is carefully crafted to empower your individual style journey.
              </p>
              <div className="story-stats">
                <div className="stat">
                  <h3>10K+</h3>
                  <p>Happy Customers</p>
                </div>
                <div className="stat">
                  <h3>500+</h3>
                  <p>Products</p>
                </div>
                <div className="stat">
                  <h3>50+</h3>
                  <p>Countries</p>
                </div>
              </div>
            </div>
            <div className="story-image">
              <img src="/api/placeholder/500/400" alt="Our Story" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;