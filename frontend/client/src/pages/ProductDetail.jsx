import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SizeChart from '../components/SizeChart';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Mock product data
  const mockProduct = {
    id: id,
    name: "Premium Silk Dress",
    price: 299.99,
    originalPrice: 399.99,
    description: "Elegant silk dress crafted with the finest materials. Perfect for special occasions and evening events. Features a sophisticated design with intricate detailing and comfortable fit.",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=800&fit=crop&crop=center"
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    category: 'Dresses',
    brand: 'Kivra Luxury',
    material: '100% Silk',
    care: 'Dry clean only',
    features: [
      'Premium silk fabric',
      'Elegant design',
      'Perfect fit',
      'Handcrafted details',
      'Sustainable production'
    ],
    inStock: true,
    rating: 4.8,
    reviews: 127
  };

  useEffect(() => {
    console.log('ProductDetail: Loading product with ID:', id);
    // Simulate API call
    setTimeout(() => {
      console.log('ProductDetail: Setting product data');
      setProduct(mockProduct);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    setIsAddingToCart(true);
    
    // Simulate API call
    setTimeout(() => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
        description: product.description
      }, selectedSize);
      setIsAddingToCart(false);
      alert('Added to cart successfully!');
    }, 1000);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    handleAddToCart();
    setTimeout(() => {
      navigate('/cart');
    }, 1500);
  };

  if (isLoading) {
    console.log('ProductDetail: Showing loading state');
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-black via-charcoal to-primary-black py-20 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary-gold/20 to-burgundy/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-burgundy/20 to-primary-gold/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Loading Skeleton */}
            <div className="space-y-6">
              <div className="relative">
                <div className="bg-white/10 rounded-2xl h-96 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/5 to-burgundy/5 rounded-2xl animate-pulse-slow"></div>
              </div>
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative">
                    <div className="bg-white/10 rounded-xl h-20 w-20 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-gold/5 to-burgundy/5 rounded-xl animate-pulse-slow" style={{ animationDelay: `${i * 0.2}s` }}></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white/10 rounded-xl h-10 w-3/4 animate-pulse"></div>
              <div className="bg-white/10 rounded-xl h-8 w-1/2 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="bg-white/10 rounded-xl h-40 w-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="bg-white/10 rounded-xl h-16 w-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    console.log('ProductDetail: Product not found');
    return (
      <div className="min-h-screen bg-primary-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-primary-white mb-4">Product Not Found</h1>
          <p className="text-gold-light mb-8">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-primary-gold to-gold-dark text-primary-black px-8 py-3 rounded-lg font-semibold hover:from-gold-dark hover:to-primary-gold transition-all duration-300 transform hover:scale-105"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  console.log('ProductDetail: Rendering main content with product:', product);
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-black via-charcoal to-primary-black py-20 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary-gold/20 to-burgundy/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-burgundy/20 to-primary-gold/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-gold-light/10 to-primary-gold/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gold-light">
            <li><button onClick={() => navigate('/')} className="hover:text-primary-gold transition-colors duration-200">Home</button></li>
            <li>/</li>
            <li><button onClick={() => navigate(`/${product.category.toLowerCase()}`)} className="hover:text-primary-gold transition-colors duration-200">{product.category}</button></li>
            <li>/</li>
            <li className="text-primary-white">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative group">
              <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Quick View Button */}
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-white hover:bg-primary-gold hover:text-primary-black transition-all duration-300 opacity-0 group-hover:opacity-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-primary-gold' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-primary-gold/20 flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary-gold rounded-full"></div>
                    </div>
                  )}
        </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-sm text-gold-light font-medium">{product.brand}</span>
                <div className="flex items-center space-x-1">
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
                  <span className="text-sm text-gold-light">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold text-primary-white mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary-gold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gold-light line-through">${product.originalPrice}</span>
                )}
              {product.originalPrice && (
                  <span className="bg-burgundy text-primary-white px-2 py-1 rounded text-sm font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
              )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-primary-white mb-3">Description</h3>
              <p className="text-gold-light leading-relaxed">{product.description}</p>
                </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-primary-white">Select Size</h3>
                <button 
                  onClick={() => setShowSizeChart(true)}
                  className="text-primary-gold hover:text-gold-light text-sm underline transition-colors duration-200"
                >
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                    <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 rounded-lg border-2 font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-primary-gold bg-primary-gold/20 text-primary-gold'
                        : 'border-white/20 text-primary-white hover:border-white/40 hover:bg-white/10'
                    }`}
                  >
                    {size}
                    </button>
                  ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-primary-white mb-4">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-white/20 rounded-lg">
            <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center text-primary-white hover:bg-white/10 transition-colors duration-200"
            >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
            </button>
                  <span className="w-16 text-center text-primary-white font-semibold">{quantity}</span>
                      <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center text-primary-white hover:bg-white/10 transition-colors duration-200"
                      >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                      </button>
                  </div>
                  
                <div className="text-gold-light text-sm">
                  {product.inStock ? (
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      In Stock
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      Out of Stock
                    </span>
                      )}
                    </div>
                  </div>
                </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className="w-full bg-gradient-to-r from-primary-gold to-gold-dark text-primary-black py-4 rounded-lg font-semibold hover:from-gold-dark hover:to-primary-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isAddingToCart ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-black"></div>
                    <span>Adding to Cart...</span>
          </div>
        ) : (
                  'Add to Cart'
                )}
                </button>
              
                <button 
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full border-2 border-primary-gold text-primary-gold py-4 rounded-lg font-semibold hover:bg-primary-gold hover:text-primary-black transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                Buy Now
                </button>
            </div>

            {/* Product Features */}
            <div>
              <h3 className="text-lg font-semibold text-primary-white mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gold-light">
                    <svg className="w-4 h-4 text-primary-gold mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-primary-white mb-2">Material</h4>
                <p className="text-gold-light">{product.material}</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary-white mb-2">Care Instructions</h4>
                <p className="text-gold-light">{product.care}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-primary-black border border-white/20 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary-white">Size Guide</h2>
              <button
                onClick={() => setShowSizeChart(false)}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 text-primary-white rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SizeChart />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
