import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(cartId, newQuantity);
  };

  const handleRemoveItem = (cartId) => {
    removeFromCart(cartId);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      alert('Please login to proceed with payment');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      alert(`Payment successful! Total: LKR ${getCartTotal().toLocaleString()}\n\nThank you for your purchase!`);
      clearCart();
      setIsProcessing(false);
      navigate('/');
    }, 2000);
  };

  const cartTotal = getCartTotal();
  const cartCount = getCartCount();
  const shippingCost = cartTotal > 50000 ? 0 : 1500; // Free shipping over LKR 50,000
  const finalTotal = cartTotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1 className="cart-title">Shopping Cart</h1>
            <p className="cart-count">0 items</p>
          </div>
          
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
              </svg>
            </div>
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-text">Looks like you haven't added any items to your cart yet.</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-count">{cartCount} items</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-actions-top">
              <button 
                className="btn-secondary clear-cart"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>

            {cartItems.map((item) => (
              <div key={item.cartId} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-description">{item.description}</p>
                  
                  <div className="item-options">
                    <span className="item-option">
                      <strong>Size:</strong> {item.selectedSize}
                    </span>
                    <span className="item-option">
                      <strong>Color:</strong> {item.selectedColor}
                    </span>
                  </div>
                </div>

                <div className="item-price">
                  <div className="price-display">
                    <span className="current-price">LKR {item.price.toLocaleString()}</span>
                    {item.originalPrice && (
                      <span className="original-price">LKR {item.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                <div className="item-quantity">
                  <label className="quantity-label">Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="item-total">
                  <span className="total-label">Total:</span>
                  <span className="total-price">
                    LKR {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>

                <div className="item-actions">
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.cartId)}
                    title="Remove item"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-line">
                <span>Subtotal ({cartCount} items):</span>
                <span>LKR {cartTotal.toLocaleString()}</span>
              </div>
              
              <div className="summary-line">
                <span>Shipping:</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="free-shipping">FREE</span>
                  ) : (
                    `LKR ${shippingCost.toLocaleString()}`
                  )}
                </span>
              </div>

              {cartTotal > 50000 && (
                <div className="shipping-notice">
                  <span className="free-shipping-badge">🎉 Free shipping applied!</span>
                </div>
              )}

              {cartTotal < 50000 && (
                <div className="shipping-notice">
                  <span className="shipping-info">
                    Add LKR {(50000 - cartTotal).toLocaleString()} more for free shipping
                  </span>
                </div>
              )}
              
              <div className="summary-line total-line">
                <span>Total:</span>
                <span className="final-total">LKR {finalTotal.toLocaleString()}</span>
              </div>

              <button 
                className={`pay-button ${isProcessing ? 'processing' : ''}`}
                onClick={handleProceedToPayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  `Pay LKR ${finalTotal.toLocaleString()}`
                )}
              </button>

              <div className="secure-payment">
                <span className="secure-icon">🔒</span>
                <span>Secure payment powered by SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;