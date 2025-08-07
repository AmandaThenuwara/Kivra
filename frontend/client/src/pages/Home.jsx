import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    alert('You have been logged out successfully!');
  };

  const handleCategoryNavigation = (category) => {
    navigate(`/${category}`);
  };

  const heroSlides = [
    {
      title: "Luxury Redefined",
      subtitle: "Discover the epitome of sophistication and style",
      description: "Where elegance meets innovation in every stitch",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&crop=center",
      cta: "Explore Collection"
    },
    {
      title: "Timeless Elegance",
      subtitle: "Where classic meets contemporary in perfect harmony",
      description: "Crafted with precision, designed for the modern individual",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&h=1080&fit=crop&crop=center",
      cta: "Shop Now"
    },
    {
      title: "Premium Craftsmanship",
      subtitle: "Every piece tells a story of exceptional quality",
      description: "Uncompromising standards in every detail",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1920&h=1080&fit=crop&crop=center",
      cta: "View Lookbook"
    }
  ];

  return (
    <div className="min-h-screen bg-primary-black">
      {/* Hero Section - Clear and Professional Design */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image - Clothing Store */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&crop=center" 
            alt="Luxury Fashion Store" 
            className="w-full h-full object-cover"
          />
          {/* Clean Dark Red Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-burgundy/80 via-burgundy-dark/70 to-primary-black/90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-transparent to-transparent"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            
            {/* Main Heading - Clear and Bold */}
            <div className={`mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-primary-white leading-none tracking-tight mb-8">
                <span className="block text-primary-white">DISCOVER YOUR</span>
                <span className="block text-primary-gold">PERFECT STYLE</span>
              </h1>
            </div>

            {/* Call-to-Action Buttons - Clear and Prominent */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
              <button 
                onClick={() => handleCategoryNavigation('men')}
                className="group relative overflow-hidden bg-gradient-to-r from-primary-gold to-gold-dark text-primary-black px-10 py-4 rounded-lg font-bold text-lg hover:from-gold-dark hover:to-primary-gold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <span>SHOP COLLECTION</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              
              <button 
                onClick={() => handleCategoryNavigation('women')}
                className="group relative overflow-hidden border-2 border-primary-white text-primary-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-primary-white hover:text-primary-black transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <span>VIEW LOOKBOOK</span>
                  <svg className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Discover More Section */}
            <div className={`mb-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
              <div className="text-center">
                <span className="text-primary-white/80 font-medium tracking-wider text-sm">DISCOVER MORE</span>
              </div>
            </div>

            {/* Statistics Section - Clear and Prominent */}
            <div className={`grid grid-cols-3 gap-8 max-w-4xl mx-auto ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{animationDelay: '0.6s'}}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-primary-gold mb-2">50K+</div>
                <div className="text-sm text-primary-white/70 font-medium tracking-wider">HAPPY CUSTOMERS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-primary-gold mb-2">1500+</div>
                <div className="text-sm text-primary-white/70 font-medium tracking-wider">PREMIUM PRODUCTS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black text-primary-gold mb-2">75+</div>
                <div className="text-sm text-primary-white/70 font-medium tracking-wider">COUNTRIES</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-32 bg-gradient-to-br from-primary-black via-charcoal to-primary-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-primary-white mb-6">
              <span className="gradient-text">Shop by</span> Category
            </h2>
            <p className="text-xl text-gold-light max-w-3xl mx-auto">
              Explore our curated collections designed for the modern individual who appreciates quality and style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Men's Collection",
                subtitle: "Sophisticated & Modern",
                description: "Timeless pieces that define contemporary masculinity",
                image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=800&fit=crop&crop=center",
                category: "men",
                gradient: "from-primary-gold/20 to-burgundy/20"
              },
              {
                title: "Women's Collection",
                subtitle: "Elegant & Chic",
                description: "Feminine designs that celebrate individuality",
                image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop&crop=center",
                category: "women",
                gradient: "from-burgundy/20 to-primary-gold/20"
              },
              {
                title: "Accessories",
                subtitle: "Perfect Finishing Touches",
                description: "Complete your look with premium accessories",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop&crop=center",
                category: "accessories",
                gradient: "from-gold-light/20 to-primary-gold/20"
              }
            ].map((category, index) => (
              <div 
                key={category.category}
                className="group relative h-[600px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-4xl transition-all duration-700 transform hover:-translate-y-4"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} group-hover:opacity-80 transition-opacity duration-500`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-black via-primary-black/50 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-10 text-primary-white">
                  <div className="mb-4">
                    <span className="inline-block bg-primary-gold/20 text-primary-gold px-3 py-1 rounded-full text-xs font-medium">
                      COLLECTION
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-3">{category.title}</h3>
                  <p className="text-gold-light mb-4">{category.subtitle}</p>
                  <p className="text-smoke text-sm mb-6">{category.description}</p>
                  <button 
                    className="group/btn relative overflow-hidden bg-primary-gold text-primary-black px-8 py-4 rounded-xl font-bold hover:bg-gold-dark transition-all duration-300 hover:scale-105"
                    onClick={() => handleCategoryNavigation(category.category)}
                  >
                    <span className="relative z-10">Explore Collection</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-primary-gold transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-32 bg-gradient-to-br from-charcoal via-primary-black to-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-primary-white mb-6">
              <span className="gradient-text">Featured</span> Products
            </h2>
            <p className="text-xl text-gold-light">Handpicked pieces from our latest premium collection</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                id: 1, 
                name: 'Premium Silk Dress', 
                category: 'Women\'s Wear', 
                price: '$299.99', 
                originalPrice: '$399.99', 
                rating: 5, 
                reviews: 124, 
                image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop&crop=center', 
                discount: 25,
                badge: 'NEW'
              },
              { 
                id: 2, 
                name: 'Luxury Wool Coat', 
                category: 'Outerwear', 
                price: '$499.99', 
                originalPrice: '$699.99', 
                rating: 5, 
                reviews: 89, 
                image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop&crop=center', 
                discount: 29,
                badge: 'BEST SELLER'
              },
              { 
                id: 3, 
                name: 'Designer Leather Shoes', 
                category: 'Footwear', 
                price: '$349.99', 
                originalPrice: '$449.99', 
                rating: 5, 
                reviews: 67, 
                image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop&crop=center', 
                discount: 22,
                badge: 'LIMITED'
              },
              { 
                id: 4, 
                name: 'Cashmere Sweater', 
                category: 'Knitwear', 
                price: '$199.99', 
                originalPrice: '$279.99', 
                rating: 4, 
                reviews: 156, 
                image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop&crop=center', 
                discount: 29,
                badge: 'PREMIUM'
              }
            ].map((product, index) => (
              <div 
                key={product.id} 
                className="group bg-gradient-to-br from-pearl via-smoke to-gold-light rounded-3xl overflow-hidden shadow-2xl hover:shadow-4xl transition-all duration-500 transform hover:-translate-y-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    loading="lazy" 
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                    <button className="bg-primary-gold text-primary-black px-6 py-3 rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hover:scale-105">
                      Quick View
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-burgundy text-primary-white px-3 py-1 rounded-full text-xs font-bold">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary-gold text-primary-black px-2 py-1 rounded-full text-xs font-bold">
                      -{product.discount}%
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-charcoal text-sm font-medium">{product.category}</p>
                    <div className="flex items-center">
                      <div className="flex text-primary-gold">
                        {'★'.repeat(product.rating)}{'☆'.repeat(5-product.rating)}
                      </div>
                      <span className="text-charcoal text-sm ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">{product.name}</h3>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl font-bold text-charcoal">{product.price}</span>
                    <span className="text-charcoal line-through">{product.originalPrice}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-primary-gold to-gold-dark text-primary-black py-3 rounded-xl font-bold hover:from-gold-dark hover:to-primary-gold transition-all duration-300 transform hover:scale-105">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-32 bg-gradient-to-br from-burgundy via-burgundy-dark to-primary-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy/20 to-primary-black/20 opacity-20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <span className="inline-block bg-primary-gold/20 text-primary-gold px-4 py-2 rounded-full text-sm font-medium">
              ✨ STAY CONNECTED
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-primary-white mb-6">
            Stay in <span className="gradient-text">Style</span>
          </h2>
          <p className="text-xl text-gold-light mb-12 max-w-2xl mx-auto">
            Subscribe to get exclusive offers, early access to new collections, and insider updates on the latest fashion trends
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-primary-gold bg-primary-white/10 text-primary-white placeholder-gold-light"
              aria-label="Email address for newsletter"
            />
            <button className="bg-primary-gold text-primary-black px-8 py-4 rounded-xl font-bold hover:bg-gold-dark transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Brand Story Section */}
      <section className="py-32 bg-gradient-to-br from-primary-black via-charcoal to-primary-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-8">
                <span className="inline-block bg-primary-gold/20 text-primary-gold px-4 py-2 rounded-full text-sm font-medium">
                  ✨ OUR STORY
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-primary-white mb-8">
                <span className="gradient-text">Our</span> Story
              </h2>
              <p className="text-xl text-gold-light leading-relaxed mb-12">
                Born from a passion for timeless style and exceptional quality, Kivra represents 
                the perfect fusion of contemporary design and classic elegance. Every piece is crafted 
                with attention to detail and a commitment to excellence.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-primary-gold mb-2">50K+</h3>
                  <p className="text-gold-light">Happy Customers</p>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-primary-gold mb-2">1500+</h3>
                  <p className="text-gold-light">Premium Products</p>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-primary-gold mb-2">75+</h3>
                  <p className="text-gold-light">Countries Worldwide</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/20 to-burgundy/20 rounded-3xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=500&fit=crop&crop=center" 
                alt="Fashion boutique interior" 
                loading="lazy"
                className="relative rounded-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 bg-gradient-to-br from-charcoal via-primary-black to-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-primary-white mb-6">
              Why Choose <span className="gradient-text">Kivra</span>
            </h2>
            <p className="text-xl text-gold-light">Experience the difference that premium quality and exceptional service make</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: '🚚', 
                title: 'Free Shipping', 
                description: 'On orders over $200 worldwide',
                color: 'from-primary-gold to-gold-dark'
              },
              { 
                icon: '↩️', 
                title: 'Easy Returns', 
                description: '30-day hassle-free return policy',
                color: 'from-burgundy to-burgundy-dark'
              },
              { 
                icon: '🛡️', 
                title: 'Secure Payment', 
                description: 'Safe & encrypted checkout process',
                color: 'from-primary-gold to-gold-dark'
              },
              { 
                icon: '⭐', 
                title: 'Premium Quality', 
                description: 'Curated from top designers worldwide',
                color: 'from-burgundy to-burgundy-dark'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-pearl via-smoke to-gold-light rounded-3xl p-8 text-center shadow-2xl hover:shadow-4xl transition-all duration-500 transform hover:-translate-y-4"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-4">{feature.title}</h3>
                <p className="text-charcoal leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;