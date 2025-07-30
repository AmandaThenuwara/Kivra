import React, { useState, useEffect } from 'react';
import './Products.css';

const Women = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading effect
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const womenProducts = [
    {
      id: 9,
      name: "Elegant Evening Dress",
      price: 349,
      originalPrice: 449,
      image: "https://images.unsplash.com/photo-1566479179817-c7707b8c01fe?w=400&h=500&fit=crop",
      category: "Dresses",
      sale: true,
      new: false,
      description: "Sophisticated evening dress with flowing silhouette",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "Navy", "Burgundy"]
    },
    {
      id: 10,
      name: "Silk Blouse",
      price: 189,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop",
      category: "Blouses",
      sale: false,
      new: true,
      description: "Pure silk blouse with French seams",
      sizes: ["XS", "S", "M", "L"],
      colors: ["White", "Cream", "Blush"]
    },
    {
      id: 11,
      name: "Designer Handbag",
      price: 599,
      originalPrice: 799,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
      category: "Bags",
      sale: true,
      new: false,
      description: "Luxury leather handbag with gold hardware",
      sizes: ["One Size"],
      colors: ["Black", "Tan", "Red"]
    },
    {
      id: 12,
      name: "Cashmere Coat",
      price: 799,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop",
      category: "Outerwear",
      sale: false,
      new: true,
      description: "Double-breasted cashmere coat with belt",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Camel", "Black", "Navy"]
    },
    {
      id: 13,
      name: "High-Heel Pumps",
      price: 249,
      originalPrice: 329,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop",
      category: "Shoes",
      sale: true,
      new: false,
      description: "Classic pointed-toe pumps with 4-inch heel",
      sizes: ["5", "6", "7", "8", "9", "10"],
      colors: ["Black", "Nude", "Red"]
    },
    {
      id: 14,
      name: "Pearl Jewelry Set",
      price: 399,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
      category: "Jewelry",
      sale: false,
      new: false,
      description: "Cultured pearl necklace and earring set",
      sizes: ["One Size"],
      colors: ["White", "Cream", "Silver"]
    },
    {
      id: 15,
      name: "Luxury Scarf",
      price: 129,
      originalPrice: 169,
      image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=500&fit=crop",
      category: "Accessories",
      sale: true,
      new: false,
      description: "Pure silk scarf with hand-rolled edges",
      sizes: ["One Size"],
      colors: ["Floral", "Geometric", "Abstract"]
    },
    {
      id: 16,
      name: "Designer Sunglasses",
      price: 299,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop",
      category: "Accessories",
      sale: false,
      new: true,
      description: "Oversized sunglasses with UV protection",
      sizes: ["One Size"],
      colors: ["Black", "Tortoise", "Gold"]
    }
  ];

  const categories = ['All', ...new Set(womenProducts.map(product => product.category))];

  const filteredProducts = womenProducts
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    // Show success message
    const button = document.querySelector(`[data-product-id="${product.id}"]`);
    if (button) {
      const originalText = button.textContent;
      button.textContent = "Added!";
      button.style.background = "linear-gradient(135deg, #28a745, #20c997)";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "";
      }, 1500);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Women's Collection...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-hero">
        <div className="hero-content">
          <h1 className="hero-title">Women's Collection</h1>
          <p className="hero-subtitle">Embrace sophistication and modern femininity</p>
        </div>
      </div>

      <div className="products-container">
        <div className="products-header">
          <h2>Exquisite Women's Fashion</h2>
          <p className="products-count">{filteredProducts.length} Products</p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-badges">
                  {product.sale && <span className="badge sale-badge">SALE</span>}
                  {product.new && <span className="badge new-badge">NEW</span>}
                </div>
                <div className="product-overlay">
                  <button 
                    className="quick-view-btn"
                    onClick={() => console.log('Quick view:', product.name)}
                  >
                    Quick View
                  </button>
                </div>
              </div>
              
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-options">
                  <div className="size-options">
                    <span className="option-label">Sizes:</span>
                    <div className="options-list">
                      {product.sizes.map(size => (
                        <span key={size} className="option-item">{size}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="color-options">
                    <span className="option-label">Colors:</span>
                    <div className="options-list">
                      {product.colors.map(color => (
                        <span key={color} className="option-item">{color}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="product-price">
                  <span className="current-price">${product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                </div>
                <button 
                  className="add-to-cart-btn"
                  data-product-id={product.id}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-summary">
        <div className="cart-info">
          <h3>Cart Summary</h3>
          <p>{cart.reduce((total, item) => total + item.quantity, 0)} items in cart</p>
          <p className="cart-total">
            Total: ${cart.reduce((total, item) => total + (item.price * item.quantity), 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Women;
