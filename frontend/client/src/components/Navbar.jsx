import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    setIsSearchActive(false);
    setSearchQuery('');
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setTimeout(() => {
        document.querySelector('.search-input')?.focus();
      }, 100);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    alert('You have been logged out successfully!');
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
          <div className="logo-container">
            <span className="logo-text">KIVRA</span>
            <span className="logo-tagline">Luxury Fashion</span>
          </div>
        
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-section">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span>Home</span>
            </Link>
            <Link to="/men" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span>Men</span>
            </Link>
            <Link to="/women" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span>Women</span>
            </Link>
            <Link to="/accessories" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span>Accessories</span>
            </Link>
          </div>
          
          <div className="nav-section"> 
            <Link to="/new-arrivals" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              <span>New Arrivals</span>
            </Link>
          </div>

<div className={`search-container ${isSearchActive ? 'active' : ''}`}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                className="search-input"
                placeholder="Search luxury fashion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-submit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </form>
            <button className="search-btn" onClick={toggleSearch}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>

          <div className="user-menu">
            {isAuthenticated ? (
              <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
                <div className="user-avatar">
                  <span className="user-initial">
                    {user.firstName ? user.firstName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="user-name">
                  {user.firstName || user.email.split('@')[0]}
                </span>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                      <span>Profile</span>
                    </Link>
                    <Link to="/orders" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                      <span>My Orders</span>
                    </Link>
                    <button className="dropdown-item logout-btn" onClick={handleLogout}>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-btn">
                <span>Login</span>
              </Link>
            )}
          </div>

          <Link to="/cart" className="cart-btn" title="Shopping Cart">
            <div className="cart-icon-container">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
              </svg>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
            <span className="cart-text">Cart</span>
          </Link>


        </div>

       

        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchActive && (
        <div className="mobile-search-overlay">
          <form onSubmit={handleSearchSubmit} className="mobile-search-form">
            <input
              type="text"
              className="mobile-search-input"
              placeholder="Search luxury fashion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="mobile-search-submit">
              Search
            </button>
            <button 
              type="button" 
              className="mobile-search-close"
              onClick={() => setIsSearchActive(false)}
            >
              ✕
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
