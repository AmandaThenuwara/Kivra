import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Men\'s Collection', path: '/men' },
      { name: 'Women\'s Collection', path: '/women' },
      { name: 'Accessories', path: '/accessories' },
      { name: 'New Arrivals', path: '/new-arrivals' }
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Size Guide', path: '/size-guide' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Sustainability', path: '/sustainability' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Accessibility', path: '/accessibility' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'Pinterest', icon: '📌', url: 'https://pinterest.com' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com' }
  ];

  return (
    <footer className="bg-gradient-to-br from-charcoal via-primary-black to-charcoal relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            
          {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Link to="/" className="inline-flex items-center space-x-2 group">
                  <div className="relative">
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary-gold via-gold-light to-burgundy bg-clip-text text-transparent animate-shimmer">
                      KIVRA
                    </span>
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-gold to-burgundy group-hover:w-full transition-all duration-300"></div>
                  </div>
                </Link>
                <p className="text-sm text-gold-light mt-2">Luxury Fashion</p>
              </div>
              
              <p className="text-smoke text-sm leading-relaxed mb-6 max-w-md">
                Discover the epitome of sophistication and style. Every piece tells a story of exceptional craftsmanship and timeless elegance.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="text-primary-white font-semibold mb-3">Stay Updated</h4>
                <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg text-primary-white placeholder-gold-light focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-primary-gold text-primary-black rounded-r-lg hover:bg-gold-dark transition-colors duration-300 font-medium">
                    Subscribe
                </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-primary-white font-semibold mb-3">Follow Us</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 hover:bg-primary-gold/20 border border-white/20 rounded-lg flex items-center justify-center text-primary-white hover:text-primary-gold transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
              </div>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h4 className="text-primary-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-smoke hover:text-primary-gold transition-colors duration-300 text-sm group"
                    >
                      <span className="relative">
                        {link.name}
                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-300"></div>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-primary-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-smoke hover:text-primary-gold transition-colors duration-300 text-sm group"
                    >
                      <span className="relative">
                        {link.name}
                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-300"></div>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-primary-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-smoke hover:text-primary-gold transition-colors duration-300 text-sm group"
                    >
                      <span className="relative">
                        {link.name}
                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-300"></div>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-primary-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-smoke hover:text-primary-gold transition-colors duration-300 text-sm group"
                    >
                      <span className="relative">
                        {link.name}
                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-gold group-hover:w-full transition-all duration-300"></div>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-smoke text-sm">
              © {currentYear} Kivra Luxury Fashion. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-primary-gold">🔒</span>
                <span className="text-smoke text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-primary-gold">🚚</span>
                <span className="text-smoke text-sm">Free Shipping</span>
            </div>
              <div className="flex items-center space-x-2">
                <span className="text-primary-gold">↩️</span>
                <span className="text-smoke text-sm">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 animate-float">
        <div className="w-8 h-8 bg-primary-gold/20 rounded-full blur-sm"></div>
      </div>
      <div className="absolute bottom-1/4 left-10 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-6 h-6 bg-burgundy/20 rounded-full blur-sm"></div>
      </div>
    </footer>
  );
};

export default Footer;

