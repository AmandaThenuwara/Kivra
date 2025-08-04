import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <h3 className="footer-logo">KIVRA</h3>
            <p className="footer-tagline">Luxury Fashion Redefined</p>
            <p className="footer-description">
              Discover timeless elegance and contemporary style with our curated collection 
              of premium fashion pieces designed for the modern lifestyle.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              
              
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Shop</h4>
            <ul className="footer-links">
              <li><Link to="/men">Men's Collection</Link></li>
              <li><Link to="/women">Women's Collection</Link></li>
              <li><Link to="/new-arrivals">New Arrivals</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
              <li><a href="#">Sale Items</a></li>
              <li><a href="#">Gift Cards</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4 className="footer-title">Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Order Tracking</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Live Chat</a></li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Kivra</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Investor Relations</a></li>
              <li><a href="#">Store Locator</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section newsletter-section">
            <h4 className="footer-title">Stay Connected</h4>
            <p className="newsletter-text">
              Subscribe to our newsletter for exclusive offers, style tips, and early access to new collections.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="newsletter-input-group">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
                <button 
                  type="submit" 
                  className="newsletter-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
              {message && (
                <div className={`newsletter-message ${message.includes('Successfully') ? 'success' : 'error'}`}>
                  {message}
                </div>
              )}
            </form>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>hello@kivra.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Fashion Ave, Style City, SC 12345</span>
              </div>
            </div>
          </div>
        </div>

       

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-bottom-left">
              <p>&copy; 2025 Kivra. All rights reserved.</p>
              <div className="footer-legal">
                <a href="#">Privacy Policy</a>
                <span className="separator">|</span>
                <a href="#">Terms of Service</a>
                <span className="separator">|</span>
                <a href="#">Cookie Policy</a>
                <span className="separator">|</span>
                <a href="#">Accessibility</a>
              </div>
            </div>
            <div className="footer-bottom-right">
              <div className="certifications">
                <span className="cert-badge">SSL Secured</span>
                <span className="cert-badge">Eco Friendly</span>
                <span className="cert-badge">Ethically Made</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
