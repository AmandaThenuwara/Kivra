import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const NewArrivals = () => {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading effect
    setTimeout(() => setIsLoading(false), 1200);
  }, []);

  const newArrivalProducts = [
    {
      id: 17,
      name: "Limited Edition Jacket",
      price: 599,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop",
      category: "Outerwear",
      sale: false,
      new: true,
      description: "Exclusive limited edition bomber jacket",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Olive", "Navy"],
      arrivalDate: "2025-07-28",
      limited: true
    },
    {
      id: 18,
      name: "Artisan Leather Boots",
      price: 449,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1608256246200-53e8b47b8fd9?w=400&h=500&fit=crop",
      category: "Footwear",
      sale: false,
      new: true,
      description: "Handcrafted leather boots with premium finish",
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Brown", "Black", "Tan"],
      arrivalDate: "2025-07-27",
      limited: false
    },
    {
      id: 19,
      name: "Signature Fragrance",
      price: 189,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=500&fit=crop",
      category: "Fragrance",
      sale: false,
      new: true,
      description: "Exclusive signature scent with notes of bergamot",
      sizes: ["50ml", "100ml"],
      colors: ["Classic"],
      arrivalDate: "2025-07-26",
      limited: true
    },
    {
      id: 20,
      name: "Premium Denim Collection",
      price: 299,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
      category: "Denim",
      sale: false,
      new: true,
      description: "Japanese selvedge denim with vintage wash",
      sizes: ["28", "30", "32", "34", "36"],
      colors: ["Indigo", "Black", "Raw"],
      arrivalDate: "2025-07-25",
      limited: false
    },
    {
      id: 21,
      name: "Exclusive Designer Dress",
      price: 899,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1566479179817-c7707b8c01fe?w=400&h=500&fit=crop",
      category: "Dresses",
      sale: false,
      new: true,
      description: "Couture dress from our exclusive designer collaboration",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Midnight", "Emerald", "Ruby"],
      arrivalDate: "2025-07-24",
      limited: true
    },
    {
      id: 22,
      name: "Luxury Sport Watch",
      price: 1899,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop",
      category: "Watches",
      sale: false,
      new: true,
      description: "Swiss-made sport watch with titanium case",
      sizes: ["One Size"],
      colors: ["Titanium", "Black", "Blue"],
      arrivalDate: "2025-07-23",
      limited: true
    },
    {
      id: 23,
      name: "Designer Sneakers",
      price: 349,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1560072810-1cdd64903750?w=400&h=500&fit=crop",
      category: "Sneakers",
      sale: false,
      new: true,
      description: "Limited edition designer sneakers with premium materials",
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["White", "Black", "Grey"],
      arrivalDate: "2025-07-22",
      limited: false
    },
    {
      id: 24,
      name: "Vintage Inspired Glasses",
      price: 199,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop",
      category: "Eyewear",
      sale: false,
      new: true,
      description: "Vintage-inspired frames with modern lens technology",
      sizes: ["One Size"],
      colors: ["Tortoise", "Black", "Gold"],
      arrivalDate: "2025-07-21",
      limited: false
    }
  ];

  const categories = ['All', ...new Set(newArrivalProducts.map(product => product.category))];

  const filteredProducts = newArrivalProducts
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.arrivalDate) - new Date(a.arrivalDate);
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
        <div className="loading-spinner new-arrivals-spinner"></div>
        <p>Loading Latest Arrivals...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-hero new-arrivals-hero">
        <div className="hero-content">
          <h1 className="hero-title">New Arrivals</h1>
          <p className="hero-subtitle">Fresh styles just landed - Be the first to discover</p>
          <div className="hero-badge">
            <span className="new-collection-badge">JUST ARRIVED</span>
          </div>
        </div>
      </div>

      <div className="products-container">
        <div className="products-header">
          <h2>Latest Collection</h2>
          <p className="products-count">{filteredProducts.length} New Products</p>
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
            <div key={product.id} className="product-card new-arrival-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-badges">
                  <span className="badge new-badge pulsing">NEW</span>
                  {product.limited && <span className="badge limited-badge">LIMITED</span>}
                </div>
                <div className="product-overlay">
                  <button 
                    className="quick-view-btn"
                    onClick={() => navigate(`/product/new-arrivals/${product.id}`)}
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
                  <span className="new-label">New Arrival</span>
                </div>
                <button 
                  className="add-to-cart-btn new-arrival-btn"
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
    </div>
  );
};

export default NewArrivals;
