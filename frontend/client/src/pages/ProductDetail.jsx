import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SizeChart from '../components/SizeChart';
import './Products.css';

const ProductDetail = () => {
  const { productId, category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  // Combined product data from all categories
  const allProducts = [
    // Men's products
    {
      id: 1,
      name: "Classic Oxford Shirt",
      price: 14900,
      originalPrice: 19900,
      image: "https://images.unsplash.com/photo-1564257577386-5d7c5d4e3e4e?w=400&h=500&fit=crop",
      category: "Shirts",
      sale: true,
      new: false,
      description: "Premium cotton oxford shirt with modern fit",
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Blue", "Light Blue"],
      pageCategory: "men"
    },
    {
      id: 2,
      name: "Premium Wool Suit",
      price: 89900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      category: "Suits",
      sale: false,
      new: true,
      description: "Handcrafted wool suit with Italian tailoring",
      sizes: ["38", "40", "42", "44", "46"],
      colors: ["Navy", "Charcoal", "Black"],
      pageCategory: "men"
    },
    {
      id: 3,
      name: "Leather Dress Shoes",
      price: 29900,
      originalPrice: 39900,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
      category: "Shoes",
      sale: true,
      new: false,
      description: "Genuine leather oxford shoes with leather sole",
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Black", "Brown", "Cognac"],
      pageCategory: "men"
    },
    {
      id: 4,
      name: "Cashmere Sweater",
      price: 24900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=500&fit=crop",
      category: "Knitwear",
      sale: false,
      new: true,
      description: "100% cashmere crew neck sweater",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Navy", "Grey", "Camel"],
      pageCategory: "men"
    },
    {
      id: 5,
      name: "Tailored Blazer",
      price: 39900,
      originalPrice: 49900,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
      category: "Blazers",
      sale: true,
      new: false,
      description: "Slim fit blazer with peak lapels",
      sizes: ["38", "40", "42", "44"],
      colors: ["Navy", "Black", "Grey"],
      pageCategory: "men"
    },
    {
      id: 6,
      name: "Designer Jeans",
      price: 18900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
      category: "Denim",
      sale: false,
      new: false,
      description: "Premium denim with contemporary fit",
      sizes: ["30", "32", "34", "36", "38"],
      colors: ["Dark Blue", "Black", "Light Blue"],
      pageCategory: "men"
    },
    {
      id: 7,
      name: "Luxury Watch",
      price: 129900,
      originalPrice: 159900,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop",
      category: "Accessories",
      sale: true,
      new: false,
      description: "Swiss movement luxury timepiece",
      sizes: ["One Size"],
      colors: ["Silver", "Gold", "Black"],
      pageCategory: "men"
    },
    {
      id: 8,
      name: "Silk Tie Collection",
      price: 8900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
      category: "Accessories",
      sale: false,
      new: true,
      description: "Hand-crafted silk ties with premium patterns",
      sizes: ["One Size"],
      colors: ["Navy", "Burgundy", "Gold"],
      pageCategory: "men"
    },
    // Women's products
    {
      id: 9,
      name: "Elegant Evening Dress",
      price: 34900,
      originalPrice: 44900,
      image: "https://images.unsplash.com/photo-1566479179817-c7707b8c01fe?w=400&h=500&fit=crop",
      category: "Dresses",
      sale: true,
      new: false,
      description: "Sophisticated evening dress with flowing silhouette",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Black", "Navy", "Burgundy"],
      pageCategory: "women"
    },
    {
      id: 10,
      name: "Silk Blouse",
      price: 18900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=500&fit=crop",
      category: "Blouses",
      sale: false,
      new: true,
      description: "Pure silk blouse with French seams",
      sizes: ["XS", "S", "M", "L"],
      colors: ["White", "Cream", "Blush"],
      pageCategory: "women"
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
      pageCategory: "women"
    },
    {
      id: 12,
      name: "Cashmere Coat",
      price: 79900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop",
      category: "Outerwear",
      sale: false,
      new: true,
      description: "Double-breasted cashmere coat with belt",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Camel", "Black", "Navy"],
      pageCategory: "women"
    },
    {
      id: 13,
      name: "High-Heel Pumps",
      price: 24900,
      originalPrice: 32900,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop",
      category: "Shoes",
      sale: true,
      new: false,
      description: "Classic pointed-toe pumps with 4-inch heel",
      sizes: ["5", "6", "7", "8", "9", "10"],
      colors: ["Black", "Nude", "Red"],
      pageCategory: "women"
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
      pageCategory: "women"
    },
    {
      id: 15,
      name: "Luxury Scarf",
      price: 12900,
      originalPrice: 16900,
      image: "https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=500&fit=crop",
      category: "Accessories",
      sale: true,
      new: false,
      description: "Pure silk scarf with hand-rolled edges",
      sizes: ["One Size"],
      colors: ["Floral", "Geometric", "Abstract"],
      pageCategory: "women"
    },
    {
      id: 16,
      name: "Designer Sunglasses",
      price: 29900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop",
      category: "Accessories",
      sale: false,
      new: true,
      description: "Oversized sunglasses with UV protection",
      sizes: ["One Size"],
      colors: ["Black", "Tortoise", "Gold"],
      pageCategory: "women"
    },
    // New Arrivals products
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
      limited: true,
      pageCategory: "new-arrivals"
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
      limited: false,
      pageCategory: "new-arrivals"
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
      description: "Exclusive signature scent with notes of bergamot and sandalwood",
      sizes: ["50ml", "100ml"],
      colors: ["Original"],
      arrivalDate: "2025-07-26",
      limited: true,
      pageCategory: "new-arrivals"
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
      limited: false,
      pageCategory: "new-arrivals"
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
      limited: true,
      pageCategory: "new-arrivals"
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
      limited: true,
      pageCategory: "new-arrivals"
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
      limited: false,
      pageCategory: "new-arrivals"
    },
    {
      id: 24,
      name: "Artisan Jewelry Collection",
      price: 59900,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
      category: "Jewelry",
      sale: false,
      new: true,
      description: "Handcrafted jewelry pieces by renowned artisans",
      sizes: ["One Size"],
      colors: ["Gold", "Silver", "Rose Gold"],
      arrivalDate: "2025-07-21",
      limited: true,
      pageCategory: "new-arrivals"
    },
    // Accessories products
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

  const product = allProducts.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color before adding to cart');
      return;
    }

    const cartItem = addToCart(product, selectedSize, selectedColor);
    alert('Product added to cart successfully!');
    
    // Navigate to cart after adding item
    navigate('/cart');
  };

  // Helper function to determine gender based on category
  const getGender = () => {
    if (category === 'men') return 'men';
    if (category === 'women') return 'women';
    return 'general';
  };

  // Function to get similar products
  const getSimilarProducts = () => {
    if (!product) return [];
    
    // Create a scoring system for similarity
    const scoredProducts = allProducts
      .filter(p => p.id !== product.id) // Exclude current product
      .map(p => {
        let score = 0;
        
        // Same category gets highest priority
        if (p.category === product.category) score += 10;
        
        // Same page category gets medium priority
        if (p.pageCategory === product.pageCategory) score += 7;
        
        // Similar price range gets bonus points
        const priceDiff = Math.abs(p.price - product.price);
        const priceRange = product.price * 0.5; // 50% price range
        if (priceDiff <= priceRange) score += 5;
        
        // Sale items prioritized if current item is on sale
        if (product.sale && p.sale) score += 3;
        
        // New items prioritized if current item is new
        if (product.new && p.new) score += 3;
        
        // Limited items get special priority
        if (p.limited) score += 2;
        
        return { ...p, similarityScore: score };
      })
      .sort((a, b) => b.similarityScore - a.similarityScore); // Sort by score descending
    
    // Get products with similarity score > 0 first
    let similarProducts = scoredProducts.filter(p => p.similarityScore > 0);
    
    // If we don't have enough similar products, add some random ones from the same page category
    if (similarProducts.length < 4) {
      const additionalProducts = scoredProducts
        .filter(p => p.similarityScore === 0 && p.pageCategory === product.pageCategory)
        .slice(0, 4 - similarProducts.length);
      similarProducts = [...similarProducts, ...additionalProducts];
    }
    
    // Return top 4 most similar products
    return similarProducts.slice(0, 4);
  };

  const similarProducts = getSimilarProducts();

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back to {category === 'new-arrivals' ? 'New Arrivals' : category.charAt(0).toUpperCase() + category.slice(1)}
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
            <div className="product-badges">
              {product.sale && <span className="badge sale-badge">SALE</span>}
              {product.new && <span className="badge new-badge">NEW</span>}
              {product.limited && <span className="badge limited-badge">LIMITED</span>}
            </div>
          </div>

          <div className="product-detail-info">
            <div className="product-category">{product.category}</div>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>

            <div className="product-price">
              <span className="current-price">LKR {product.price}</span>
              {product.originalPrice && (
                <span className="original-price">LKR {product.originalPrice}</span>
              )}
            </div>

            <div className="product-options-detail">
              <div className="size-selection">
                <h3>Select Size:</h3>
                <div className="size-grid">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button 
                  className="size-guide-btn"
                  onClick={() => setSizeChartOpen(true)}
                >
                  Size Guide
                </button>
              </div>

              <div className="color-selection">
                <h3>Select Color:</h3>
                <div className="color-grid">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="selection-summary">
              {selectedSize && <span>Size: {selectedSize}</span>}
              {selectedColor && <span>Color: {selectedColor}</span>}
            </div>

            <button 
              className="add-to-cart-btn-detail"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 ? (
          <div className="similar-products-section">
            <h2 className="similar-products-title">You Might Also Like</h2>
            <div className="similar-products-grid">
              {similarProducts.map(similarProduct => (
                <div key={similarProduct.id} className="similar-product-card">
                  <div className="similar-product-image-container">
                    <img 
                      src={similarProduct.image} 
                      alt={similarProduct.name} 
                      className="similar-product-image"
                    />
                    <div className="similar-product-badges">
                      {similarProduct.sale && <span className="badge sale-badge">SALE</span>}
                      {similarProduct.new && <span className="badge new-badge">NEW</span>}
                      {similarProduct.limited && <span className="badge limited-badge">LIMITED</span>}
                    </div>
                    <div className="similar-product-overlay">
                      <button 
                        className="similar-quick-view-btn"
                        onClick={() => navigate(`/product/${similarProduct.pageCategory}/${similarProduct.id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  
                  <div className="similar-product-info">
                    <div className="similar-product-category">{similarProduct.category}</div>
                    <h3 className="similar-product-name">{similarProduct.name}</h3>
                    
                    {/* Show similarity reason */}
                    {similarProduct.category === product.category && (
                      <div className="similarity-reason">Same Category</div>
                    )}
                    
                    <div className="similar-product-price">
                      <span className="current-price">LKR {similarProduct.price}</span>
                      {similarProduct.originalPrice && (
                        <span className="original-price">LKR {similarProduct.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="similar-products-section">
            <h2 className="similar-products-title">Explore More Products</h2>
            <div className="no-similar-products">
              <p>Check out our other collections for more amazing products!</p>
              <div className="explore-buttons">
                <button 
                  className="explore-btn"
                  onClick={() => navigate('/men')}
                >
                  Men's Collection
                </button>
                <button 
                  className="explore-btn"
                  onClick={() => navigate('/women')}
                >
                  Women's Collection
                </button>
                <button 
                  className="explore-btn"
                  onClick={() => navigate('/new-arrivals')}
                >
                  New Arrivals
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <SizeChart 
        isOpen={sizeChartOpen}
        onClose={() => setSizeChartOpen(false)}
        category={product.category}
        gender={getGender()}
      />
    </div>
  );
};

export default ProductDetail;
