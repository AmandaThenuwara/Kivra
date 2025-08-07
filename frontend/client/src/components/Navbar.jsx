import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: 'HOME', path: '/', id: 'home' },
    { name: 'MEN', path: '/men', id: 'men' },
    { name: 'WOMEN', path: '/women', id: 'women' },
    { name: 'ACCESSORIES', path: '/accessories', id: 'accessories' },
    { name: 'NEW ARRIVALS', path: '/new-arrivals', id: 'new-arrivals' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-primary-black/95 backdrop-blur-md shadow-lg' 
        : 'bg-primary-black'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex flex-col group">
              <span className="text-3xl font-display font-black bg-gradient-to-r from-primary-gold via-gold-light to-burgundy bg-clip-text text-transparent group-hover:animate-pulse-slow transition-all duration-300">
                KIVRA
              </span>
              <span className="text-sm text-primary-white font-medium tracking-wider mt-1">
                LUXURY FASHION
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.id}
                  to={link.path}
                  onClick={() => setActiveLink(link.id)}
                  className={`relative font-medium tracking-wider transition-all duration-300 ${
                    activeLink === link.id 
                      ? 'text-primary-gold' 
                      : 'text-primary-white hover:text-primary-gold'
                  }`}
                >
                  {link.name}
                  {activeLink === link.id && (
                    <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary-gold"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    className="w-64 px-4 py-2.5 text-sm bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-all duration-200 text-primary-white placeholder-gray-400"
                    placeholder="Search luxury fashion..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-gold hover:text-gold-light transition-colors duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Login Link */}
            <Link to="/login" className="text-primary-white hover:text-primary-gold font-medium tracking-wider transition-colors duration-200">
              LOGIN
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="flex flex-col items-center group">
              <div className="relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary-gold group-hover:text-gold-light transition-colors duration-200">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-burgundy text-primary-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs text-primary-white font-medium tracking-wider mt-1">CART</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-primary-white hover:text-primary-gold transition-colors duration-200"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="py-4 space-y-4 border-t border-gray-700">
            {navLinks.map((link) => (
              <Link 
                key={link.id}
                to={link.path}
                onClick={() => {
                  setActiveLink(link.id);
                  setIsMenuOpen(false);
                }}
                className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeLink === link.id 
                    ? 'text-primary-gold bg-gray-800 rounded-lg' 
                    : 'text-primary-white hover:text-primary-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Search */}
            <div className="px-4">
              <form onSubmit={handleSearchSubmit} className="flex">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent text-primary-white placeholder-gray-400"
                  placeholder="Search luxury fashion..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="px-4 py-2 bg-primary-gold text-primary-black rounded-r-lg hover:bg-gold-dark transition-colors duration-200">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
              </form>
            </div>

            {/* Mobile Login & Cart */}
            <div className="px-4 space-y-2">
              <Link to="/login" className="block px-4 py-2 text-sm text-primary-white hover:text-primary-gold transition-colors duration-200">
                LOGIN
              </Link>
              <Link to="/cart" className="flex items-center px-4 py-2 text-sm text-primary-white hover:text-primary-gold transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
                </svg>
                CART {cartCount > 0 && `(${cartCount})`}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
