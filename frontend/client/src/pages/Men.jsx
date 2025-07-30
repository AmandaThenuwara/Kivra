import React, { useState, useEffect } from 'react';
import './Products.css';

const Men = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading effect
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const menProducts = [
    {
      id: 1,
      name: "Classic Oxford Shirt",
      price: 149,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1564257577386-5d7c5d4e3e4e?w=400&h=500&fit=crop",
      category: "Shirts",
      sale: true,
      new: false,
      description: "Premium cotton oxford shirt with modern fit",
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Blue", "Light Blue"]
    },
    {
      id: 2,
      name: "Premium Wool Suit",
      price: 899,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      category: "Suits",
      sale: false,
      new: true,
      description: "Handcrafted wool suit with Italian tailoring",
      sizes: ["38", "40", "42", "44", "46"],
      colors: ["Navy", "Charcoal", "Black"]
    },
    {
      id: 3,
      name: "Leather Dress Shoes",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
      category: "Shoes",
      sale: true,
      new: false,
      description: "Genuine leather oxford shoes with leather sole",
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Black", "Brown", "Cognac"]
    },
    {
      id: 4,
      name: "Cashmere Sweater",
      price: 249,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=500&fit=crop",
      category: "Knitwear",
      sale: false,
      new: true,
      description: "100% cashmere crew neck sweater",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Navy", "Grey", "Camel"]
    },
    {
      id: 5,
      name: "Tailored Blazer",
      price: 399,
      originalPrice: 499,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
      category: "Blazers",
      sale: true,
      new: false,
      description: "Slim fit blazer with peak lapels",
      sizes: ["38", "40", "42", "44"],
      colors: ["Navy", "Black", "Grey"]
    },
    {
      id: 6,
      name: "Designer Jeans",
      price: 189,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
      category: "Denim",
      sale: false,
      new: false,
      description: "Premium denim with contemporary fit",
      sizes: ["30", "32", "34", "36", "38"],
      colors: ["Dark Blue", "Black", "Light Blue"]
    },
    {
      id: 7,
      name: "Luxury Watch",
      price: 1299,
      originalPrice: 1599,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop",
      category: "Accessories",
      sale: true,
      new: false,
      description: "Swiss movement luxury timepiece",
      sizes: ["One Size"],
      colors: ["Silver", "Gold", "Black"]
    },
    {
      id: 8,
      name: "Silk Tie Collection",
      price: 89,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
      category: "Accessories",
      sale: false,
      new: true,
      description: "Hand-crafted silk ties with premium patterns",
      sizes: ["One Size"],
      colors: ["Navy", "Burgundy", "Gold"]
    }
  ];

  const categories = ['All', ...new Set(menProducts.map(product => product.category))];

  const filteredProducts = menProducts
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
        <p>Loading Men's Collection...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-hero">
        <div className="hero-content">
          <h1 className="hero-title">Men's Collection</h1>
          <p className="hero-subtitle">Discover timeless elegance and contemporary style</p>
        </div>
      </div>

      <div className="products-container">
        <div className="products-header">
          <h2>Premium Men's Fashion</h2>
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

export default Men;
