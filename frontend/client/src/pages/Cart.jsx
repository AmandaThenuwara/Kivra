import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity > 0) {
    updateQuantity(cartId, newQuantity);
    }
  };

  const handleRemoveItem = (cartId) => {
    removeFromCart(cartId);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login
      return;
    }
    setIsProcessing(true);
    // Simulate checkout process
    setTimeout(() => {
      setCurrentStep(2);
      setIsProcessing(false);
    }, 2000);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate order placement
    setTimeout(() => {
      setCurrentStep(3);
      clearCart();
      setIsProcessing(false);
    }, 3000);
  };

  if (cartItems.length === 0 && currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-black via-charcoal to-primary-black py-20 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary-gold/20 to-burgundy/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-burgundy/20 to-primary-gold/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-gold-light/10 to-primary-gold/10 rounded-full blur-2xl animate-pulse-slow"></div>
          </div>
          
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Empty Cart */}
          <div className="text-center py-16">
            <div className="mb-12">
              <div className="relative group">
                <div className="w-40 h-40 mx-auto bg-gradient-to-br from-primary-gold/30 to-burgundy/30 rounded-full flex items-center justify-center mb-8 animate-pulse-slow">
                  <svg className="w-20 h-20 text-primary-gold transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                </div>
                <div className="absolute inset-0 w-40 h-40 mx-auto bg-gradient-to-br from-primary-gold/10 to-burgundy/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              </div>
              
              <h2 className="text-4xl font-bold text-primary-white mb-6 animate-fade-in">Your Cart is Empty</h2>
              <p className="text-xl text-gold-light mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>Discover our premium collection and add some luxury to your wardrobe</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/men"
                className="group relative overflow-hidden bg-gradient-to-r from-primary-gold to-gold-dark text-primary-black px-10 py-4 rounded-xl font-semibold hover:from-gold-dark hover:to-primary-gold transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold-light to-primary-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Shop Men's Collection</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link
                to="/women"
                className="group relative overflow-hidden bg-gradient-to-r from-burgundy to-burgundy-dark text-primary-white px-10 py-4 rounded-xl font-semibold hover:from-burgundy-dark hover:to-burgundy transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-burgundy-light to-burgundy opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Shop Women's Collection</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
  return (
      <div className="min-h-screen bg-primary-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Order Confirmation */}
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
              <h2 className="text-3xl font-bold text-primary-white mb-4">Order Confirmed!</h2>
              <p className="text-gold-light text-lg mb-8">Thank you for your purchase. Your order has been successfully placed.</p>
          </div>
          
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-gradient-to-r from-primary-gold to-gold-dark text-primary-black px-8 py-3 rounded-lg font-semibold hover:from-gold-dark hover:to-primary-gold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Continue Shopping
              </Link>
              <Link
                to="/orders"
                className="border-2 border-primary-gold text-primary-gold px-8 py-3 rounded-lg font-semibold hover:bg-primary-gold hover:text-primary-black transition-all duration-300 transform hover:scale-105"
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>
              </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary-white mb-4">Shopping Cart</h1>
          <div className="flex items-center space-x-4 text-gold-light">
                            <span className="text-lg">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
            <span>•</span>
            <span className="text-lg">Total: ${getCartTotal().toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Progress */}
        {currentStep > 1 && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step <= currentStep 
                      ? 'bg-primary-gold text-primary-black' 
                      : 'bg-white/10 text-gold-light'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      step < currentStep ? 'bg-primary-gold' : 'bg-white/10'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-gold-light">
                {currentStep === 1 && 'Review Cart'}
                {currentStep === 2 && 'Shipping & Payment'}
                {currentStep === 3 && 'Order Confirmation'}
              </p>
                      </div>
                    </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-primary-white mb-6">Cart Items</h2>
              
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-primary-white mb-1">{item.name}</h3>
                      <p className="text-gold-light text-sm mb-2">Size: {item.selectedSize}</p>
                      <p className="text-primary-gold font-bold">${item.price}</p>
                  </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                        className="w-8 h-8 bg-white/10 hover:bg-primary-gold/20 text-primary-white rounded-lg flex items-center justify-center transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-12 text-center text-primary-white font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                        className="w-8 h-8 bg-white/10 hover:bg-primary-gold/20 text-primary-white rounded-lg flex items-center justify-center transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                  </div>

                    {/* Remove Button */}
                    <button 
                      onClick={() => handleRemoveItem(item.cartId)}
                      className="w-8 h-8 bg-burgundy/20 hover:bg-burgundy/40 text-burgundy-light rounded-lg flex items-center justify-center transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
                </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-primary-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gold-light">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                <div className="flex justify-between text-gold-light">
                  <span>Shipping</span>
                  <span className="text-primary-gold">Free</span>
                </div>
                <div className="flex justify-between text-gold-light">
                  <span>Tax</span>
                  <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between text-xl font-bold text-primary-white">
                    <span>Total</span>
                    <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {currentStep === 1 ? (
                <button 
                  onClick={handleCheckout}
                  disabled={!isAuthenticated || isProcessing}
                  className="w-full bg-gradient-to-r from-primary-gold to-gold-dark text-primary-black py-3 rounded-lg font-semibold hover:from-gold-dark hover:to-primary-gold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-black"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
              ) : currentStep === 2 ? (
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-burgundy to-burgundy-dark text-primary-white py-3 rounded-lg font-semibold hover:from-burgundy-dark hover:to-burgundy transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-white"></div>
                      <span>Placing Order...</span>
                    </div>
                  ) : (
                    'Place Order'
                  )}
                    </button>
              ) : null}

              {!isAuthenticated && currentStep === 1 && (
                <div className="mt-4 p-4 bg-burgundy/20 border border-burgundy/30 rounded-lg">
                  <p className="text-burgundy-light text-sm text-center">
                    Please <Link to="/login" className="text-primary-gold hover:text-gold-light underline">sign in</Link> to proceed with checkout
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;