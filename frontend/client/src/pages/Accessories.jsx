import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Products.css';

const Accessories = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading effect
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const accessoryProducts = [
    {
      id: 7,
      name: "Luxury Watch",
      price: 129900,
      originalPrice: 159900,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop",
      category: "Watches",
      sale: true,
      new: false,
      description: "Swiss movement luxury timepiece",
      sizes: ["One Size"],
      colors: ["Silver", "Gold", "Black"],
      pageCategory: "accessories"
    },
    {
      id: 8,
      name: "Silk Tie Collection",
      price: 8900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
      category: "Ties",
      sale: false,
      new: true,
      description: "Hand-crafted silk ties with premium patterns",
      sizes: ["One Size"],
      colors: ["Navy", "Burgundy", "Gold"],
      pageCategory: "accessories"
    },
    {
      id: 11,
      name: "Designer Handbag",
      price: 59900,
      originalPrice: 79900,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
      category: "Bags",
      sale: true,
      new: false,
      description: "Luxury leather handbag with gold hardware",
      sizes: ["One Size"],
      colors: ["Black", "Tan", "Red"],
      pageCategory: "accessories"
    },
    {
      id: 15,
      name: "Luxury Scarf",
      price: 12900,
      originalPrice: 16900,
      image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=500&fit=crop",
      category: "Scarves",
      sale: true,
      new: false,
      description: "Pure silk scarf with hand-rolled edges",
      sizes: ["One Size"],
      colors: ["Floral", "Geometric", "Abstract"],
      pageCategory: "accessories"
    },
    {
      id: 16,
      name: "Designer Sunglasses",
      price: 29900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop",
      category: "Eyewear",
      sale: false,
      new: true,
      description: "Oversized sunglasses with UV protection",
      sizes: ["One Size"],
      colors: ["Black", "Tortoise", "Gold"],
      pageCategory: "accessories"
    },
    {
      id: 14,
      name: "Pearl Jewelry Set",
      price: 39900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
      category: "Jewelry",
      sale: false,
      new: false,
      description: "Cultured pearl necklace and earring set",
      sizes: ["One Size"],
      colors: ["White", "Cream", "Silver"],
      pageCategory: "accessories"
    },
    {
      id: 25,
      name: "Leather Belt Collection",
      price: 15900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
      category: "Belts",
      sale: false,
      new: true,
      description: "Genuine leather belts with premium buckles",
      sizes: ["32", "34", "36", "38", "40"],
      colors: ["Black", "Brown", "Cognac"],
      pageCategory: "accessories"
    },
    {
      id: 26,
      name: "Premium Wallet",
      price: 18900,
      originalPrice: 24900,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
      category: "Wallets",
      sale: true,
      new: false,
      description: "Handcrafted leather wallet with RFID protection",
      sizes: ["One Size"],
      colors: ["Black", "Brown", "Navy"],
      pageCategory: "accessories"
    },
    {
      id: 27,
      name: "Cufflinks Set",
      price: 12900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
      category: "Jewelry",
      sale: false,
      new: true,
      description: "Sterling silver cufflinks with engraved design",
      sizes: ["One Size"],
      colors: ["Silver", "Gold", "Rose Gold"],
      pageCategory: "accessories"
    },
    {
      id: 28,
      name: "Designer Hat Collection",
      price: 9900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=500&fit=crop",
      category: "Hats",
      sale: false,
      new: false,
      description: "Premium felt hats with classic styling",
      sizes: ["S", "M", "L"],
      colors: ["Black", "Navy", "Grey"],
      pageCategory: "accessories"
    },
    {
      id: 29,
      name: "Phone Case Luxury",
      price: 7900,
      originalPrice: 9900,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
      category: "Tech Accessories",
      sale: true,
      new: true,
      description: "Luxury leather phone case with card slots",
      sizes: ["iPhone", "Samsung"],
      colors: ["Black", "Brown", "Red"],
      pageCategory: "accessories"
    },
    {
      id: 30,
      name: "Keychain Collection",
      price: 4900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
      category: "Keychains",
      sale: false,
      new: false,
      description: "Premium metal keychains with elegant design",
      sizes: ["One Size"],
      colors: ["Silver", "Gold", "Black"],
      pageCategory: "accessories"
    }
  ];

  const categories = ['All', ...new Set(accessoryProducts.map(product => product.category))];

  const filteredProducts = accessoryProducts
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory);

  const handleAddToCart = (product) => {
    addToCart(product);
    
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
        <p>Loading Accessories Collection...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-hero">
        <div className="hero-content">
          <h1 className="hero-title">Accessories Collection</h1>
          <p className="hero-subtitle">Complete your look with our premium accessories</p>
        </div>
      </div>

      <div className="products-container">
        <div className="products-header">
          <h2>Premium Accessories</h2>
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
                    onClick={() => navigate(`/product/accessories/${product.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
              
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-price">
                  <span className="current-price">LKR {product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">LKR {product.originalPrice}</span>
                  )}
                </div>
                <button 
                  className="add-to-cart-btn"
                  data-product-id={product.id}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accessories;
