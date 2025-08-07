import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Accessories = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isAddingToCart, setIsAddingToCart] = useState({});

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "Luxury Leather Handbag",
      price: 399.99,
      originalPrice: 499.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop&crop=center",
      category: "bags",
      sizes: ["One Size"],
      rating: 4.9,
      reviews: 156,
      isNew: true,
      isSale: true
    },
    {
      id: 2,
      name: "Designer Sunglasses",
      price: 299.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop&crop=center",
      category: "eyewear",
      sizes: ["One Size"],
      rating: 4.8,
      reviews: 234,
      isNew: false,
      isSale: true
    },
    {
      id: 3,
      name: "Silk Scarf Collection",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=500&fit=crop&crop=center",
      category: "scarves",
      sizes: ["One Size"],
      rating: 4.7,
      reviews: 189,
      isNew: true,
      isSale: false
    },
    {
      id: 4,
      name: "Pearl Jewelry Set",
      price: 249.99,
      originalPrice: 299.99,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop&crop=center",
      category: "jewelry",
      sizes: ["One Size"],
      rating: 4.9,
      reviews: 98,
      isNew: false,
      isSale: true
    },
    {
      id: 5,
      name: "Premium Watch",
      price: 899.99,
      originalPrice: 1099.99,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop&crop=center",
      category: "watches",
      sizes: ["One Size"],
      rating: 4.9,
      reviews: 67,
      isNew: true,
      isSale: false
    },
    {
      id: 6,
      name: "Leather Belt",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop&crop=center",
      category: "belts",
      sizes: ["S", "M", "L", "XL"],
      rating: 4.6,
      reviews: 145,
      isNew: false,
      isSale: true
    }
  ];

  useEffect(() => {
    // Simulate API call
      setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
      }, 1500);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by size
    if (selectedSize !== 'all') {
      filtered = filtered.filter(product => product.sizes.includes(selectedSize));
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedSize, priceRange, sortBy]);

  const handleAddToCart = async (product) => {
    setIsAddingToCart(prev => ({ ...prev, [product.id]: true }));
    
    // Simulate API call
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.sizes[0], // Default to first size
        quantity: 1
      });
      setIsAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }, 1000);
  };

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'bags', name: 'Bags' },
    { id: 'eyewear', name: 'Eyewear' },
    { id: 'scarves', name: 'Scarves' },
    { id: 'jewelry', name: 'Jewelry' },
    { id: 'watches', name: 'Watches' },
    { id: 'belts', name: 'Belts' }
  ];

  const sizes = [
    { id: 'all', name: 'All Sizes' },
    { id: 'One Size', name: 'One Size' },
    { id: 'S', name: 'Small' },
    { id: 'M', name: 'Medium' },
    { id: 'L', name: 'Large' },
    { id: 'XL', name: 'X-Large' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-black via-charcoal to-primary-black py-20 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-charcoal/20 to-primary-gold/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-primary-gold/20 to-charcoal/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-charcoal/10 to-primary-gold/10 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Loading Skeleton */}
          <div className="mb-12">
            <div className="relative">
              <div className="bg-white/10 rounded-xl h-16 w-1/3 animate-pulse mb-6"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/5 to-primary-gold/5 rounded-xl animate-pulse-slow"></div>
            </div>
            <div className="relative">
              <div className="bg-white/10 rounded-xl h-8 w-1/2 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/5 to-primary-gold/5 rounded-xl animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-6 group">
                <div className="relative">
                  <div className="bg-white/10 rounded-2xl h-80 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal/5 to-primary-gold/5 rounded-2xl animate-pulse-slow" style={{ animationDelay: `${i * 0.1}s` }}></div>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <div className="bg-white/10 rounded-xl h-5 w-3/4 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal/5 to-primary-gold/5 rounded-xl animate-pulse-slow" style={{ animationDelay: `${i * 0.1 + 0.2}s` }}></div>
                  </div>
                  <div className="relative">
                    <div className="bg-white/10 rounded-xl h-5 w-1/2 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal/5 to-primary-gold/5 rounded-xl animate-pulse-slow" style={{ animationDelay: `${i * 0.1 + 0.4}s` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-black via-charcoal to-primary-black relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-charcoal/20 to-primary-gold/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-primary-gold/20 to-charcoal/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-charcoal/10 to-primary-gold/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-charcoal via-primary-black to-charcoal py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-primary-white mb-8 animate-fade-in">
            <span className="bg-gradient-to-r from-charcoal via-primary-gold to-charcoal bg-clip-text text-transparent animate-shimmer">Luxury</span> Accessories
          </h1>
          <p className="text-2xl text-gold-light mb-12 max-w-4xl mx-auto animate-slide-up leading-relaxed">
            Complete your look with our curated collection of premium accessories and luxury essentials
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="group bg-primary-gold text-primary-black px-6 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              {products.length} Products
            </span>
            <span className="group bg-burgundy text-primary-white px-6 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Premium Quality
            </span>
            <span className="group bg-white/20 text-primary-white px-6 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm">
              Handcrafted
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters and Sort */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="relative">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-primary-white focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent appearance-none pr-8"
            >
              {categories.map(category => (
                    <option key={category.id} value={category.id} className="bg-primary-black">
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gold-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Size Filter */}
              <div className="relative">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-primary-white focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent appearance-none pr-8"
                >
                  {sizes.map(size => (
                    <option key={size.id} value={size.id} className="bg-primary-black">
                      {size.name}
                    </option>
              ))}
            </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gold-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Price Range */}
              <div className="flex items-center space-x-2">
                <span className="text-gold-light text-sm">Price:</span>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-24 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-gold-light text-sm">${priceRange[1]}</span>
              </div>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-primary-white focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent appearance-none pr-8"
              >
                <option value="featured" className="bg-primary-black">Featured</option>
                <option value="price-low" className="bg-primary-black">Price: Low to High</option>
                <option value="price-high" className="bg-primary-black">Price: High to Low</option>
                <option value="rating" className="bg-primary-black">Highest Rated</option>
                <option value="newest" className="bg-primary-black">Newest</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gold-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gold-light">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative mb-12">
              <div className="w-40 h-40 mx-auto bg-gradient-to-br from-charcoal/30 to-primary-gold/30 rounded-full flex items-center justify-center mb-8 animate-pulse-slow">
                <svg className="w-20 h-20 text-primary-gold transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="absolute inset-0 w-40 h-40 mx-auto bg-gradient-to-br from-charcoal/10 to-primary-gold/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <h3 className="text-4xl font-bold text-primary-white mb-6 animate-fade-in">No Accessories Found</h3>
            <p className="text-xl text-gold-light mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>Try adjusting your filters to find what you're looking for.</p>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSize('all');
                  setPriceRange([0, 1000]);
                  setSortBy('featured');
                }}
                className="group relative overflow-hidden bg-gradient-to-r from-primary-gold to-gold-dark text-primary-black px-10 py-4 rounded-xl font-semibold hover:from-gold-dark hover:to-primary-gold transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-primary-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Clear Filters</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-700 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary-gold/20 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal/0 to-primary-gold/0 rounded-3xl group-hover:from-charcoal/10 group-hover:to-primary-gold/10 transition-all duration-700"></div>
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {product.isNew && (
                      <span className="bg-primary-gold text-primary-black px-3 py-1 rounded-full text-xs font-bold">
                        NEW
                      </span>
                    )}
                    {product.isSale && (
                      <span className="bg-burgundy text-primary-white px-3 py-1 rounded-full text-xs font-bold">
                        SALE
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-white hover:bg-primary-gold hover:text-primary-black transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-white hover:bg-primary-gold hover:text-primary-black transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                </div>

                  {/* Enhanced Add to Cart Button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <button 
                      onClick={() => handleAddToCart(product)}
                      disabled={isAddingToCart[product.id]}
                      className="group relative w-full bg-gradient-to-r from-primary-gold to-gold-dark text-primary-black py-4 rounded-xl font-semibold hover:from-gold-dark hover:to-primary-gold transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl overflow-hidden"
                    >
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-primary-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {isAddingToCart[product.id] ? (
                        <div className="relative z-10 flex items-center justify-center space-x-3">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-black border-t-transparent"></div>
                          <span>Adding...</span>
                        </div>
                      ) : (
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <span>Add to Cart</span>
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 group-hover:rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                          </svg>
                        </span>
                      )}
                  </button>
                </div>
              </div>
              
                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-primary-white mb-1 group-hover:text-primary-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gold-light capitalize">{product.category}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(product.rating) 
                              ? 'text-primary-gold' 
                              : 'text-white/20'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gold-light">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    <span className="text-xl font-bold text-primary-gold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gold-light line-through">${product.originalPrice}</span>
                    )}
                  {product.originalPrice && (
                      <span className="text-sm text-burgundy-light">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                  )}
                </div>

                  {/* Sizes */}
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.slice(0, 3).map((size) => (
                        <span
                          key={size}
                          className="px-2 py-1 bg-white/10 text-primary-white text-xs rounded border border-white/20"
                        >
                          {size}
                        </span>
                      ))}
                      {product.sizes.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 text-primary-white text-xs rounded border border-white/20">
                          +{product.sizes.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Accessories;
