import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Payment from '../components/Payment';
import './Pages.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'shipping', 'payment'
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Sri Lanka'
  });

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

  const handleProceedToShipping = () => {
    if (!isAuthenticated) {
      alert('Please login to proceed with checkout');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setCheckoutStep('shipping');
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'province', 'postalCode'];
    const missingFields = requiredFields.filter(field => !shippingDetails[field].trim());
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingDetails.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(shippingDetails.phone)) {
      alert('Please enter a valid phone number');
      return;
    }

    setCheckoutStep('payment');
  };

  const handleShippingInputChange = (field, value) => {
    setShippingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinueShopping = () => {
    // Determine the best category to return to based on cart contents
    if (cartItems.length > 0) {
      const lastItem = cartItems[cartItems.length - 1];
      const category = lastItem.pageCategory || 'men'; // Default to men if no category
      
      // Navigate to the appropriate category page
      if (category === 'men') {
        navigate('/men');
      } else if (category === 'women') {
        navigate('/women');
      } else if (category === 'new-arrivals') {
        navigate('/new-arrivals');
      } else if (category === 'accessories') {
        navigate('/accessories');
      } else {
        navigate('/'); // Default to home
      }
    } else {
      // If cart is empty, go to home
      navigate('/');
    }
  };

  const getContinueShoppingText = () => {
    if (cartItems.length > 0) {
      const lastItem = cartItems[cartItems.length - 1];
      const category = lastItem.pageCategory || '';
      
      switch (category) {
        case 'men':
          return 'Continue Shopping - Men';
        case 'women':
          return 'Continue Shopping - Women';
        case 'new-arrivals':
          return 'Continue Shopping - New Arrivals';
        case 'accessories':
          return 'Continue Shopping - Accessories';
        default:
          return 'Continue Shopping';
      }
    }
    return 'Continue Shopping';
  };

  const handlePaymentSuccess = (paymentData) => {
    alert(`Payment successful! Total: LKR ${finalTotal.toLocaleString()}\n\nTransaction ID: ${paymentData.transactionId}\n\nThank you for your purchase!\n\nShipping to:\n${shippingDetails.firstName} ${shippingDetails.lastName}\n${shippingDetails.address}\n${shippingDetails.city}, ${shippingDetails.province} ${shippingDetails.postalCode}`);
    clearCart();
    setCheckoutStep('cart');
    setShippingDetails({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      apartment: '',
      city: '',
      province: '',
      postalCode: '',
      country: 'Sri Lanka'
    });
    navigate('/');
  };

  const handleProceedToPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      alert(`Payment successful! Total: LKR ${finalTotal.toLocaleString()}\n\nThank you for your purchase!\n\nShipping to:\n${shippingDetails.firstName} ${shippingDetails.lastName}\n${shippingDetails.address}\n${shippingDetails.city}, ${shippingDetails.province} ${shippingDetails.postalCode}`);
      clearCart();
      setIsProcessing(false);
      setCheckoutStep('cart');
      setShippingDetails({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        apartment: '',
        city: '',
        province: '',
        postalCode: '',
        country: 'Sri Lanka'
      });
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
          <h1 className="cart-title">
            {checkoutStep === 'cart' && 'Shopping Cart'}
            {checkoutStep === 'shipping' && 'Shipping Details'}
            {checkoutStep === 'payment' && 'Payment'}
          </h1>
          <p className="cart-count">{cartCount} items</p>
        </div>

        {/* Checkout Steps Indicator */}
        <div className="checkout-steps">
          <div className={`step ${checkoutStep === 'cart' ? 'active' : checkoutStep === 'shipping' || checkoutStep === 'payment' ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Cart</div>
          </div>
          <div className={`step ${checkoutStep === 'shipping' ? 'active' : checkoutStep === 'payment' ? 'completed' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Shipping</div>
          </div>
          <div className={`step ${checkoutStep === 'payment' ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Payment</div>
          </div>
        </div>

        {/* Cart Step */}
        {checkoutStep === 'cart' && (
          <div className="cart-content">
          <div className="cart-items">
            <div className="cart-actions-top">
              <button 
                className="btn-secondary clear-cart"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
              <button 
                className="btn-outline continue-shopping"
                onClick={handleContinueShopping}
              >
                {getContinueShoppingText()}
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
                className="btn-primary checkout-button"
                onClick={handleProceedToShipping}
              >
                Proceed to Shipping
              </button>

              <div className="secure-payment">
                <span className="secure-icon">🔒</span>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Shipping Step */}
        {checkoutStep === 'shipping' && (
          <div className="shipping-content">
            <div className="shipping-form-container">
              <div className="shipping-form-section">
                <h2 className="form-section-title">Contact Information</h2>
                <form onSubmit={handleShippingSubmit} className="shipping-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        value={shippingDetails.firstName}
                        onChange={(e) => handleShippingInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        value={shippingDetails.lastName}
                        onChange={(e) => handleShippingInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        value={shippingDetails.email}
                        onChange={(e) => handleShippingInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        value={shippingDetails.phone}
                        onChange={(e) => handleShippingInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <h2 className="form-section-title">Shipping Address</h2>
                  
                  <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      id="address"
                      value={shippingDetails.address}
                      onChange={(e) => handleShippingInputChange('address', e.target.value)}
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="apartment">Apartment, suite, etc. (optional)</label>
                    <input
                      type="text"
                      id="apartment"
                      value={shippingDetails.apartment}
                      onChange={(e) => handleShippingInputChange('apartment', e.target.value)}
                      placeholder="Apartment, suite, etc."
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        value={shippingDetails.city}
                        onChange={(e) => handleShippingInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="province">Province *</label>
                      <select
                        id="province"
                        value={shippingDetails.province}
                        onChange={(e) => handleShippingInputChange('province', e.target.value)}
                        required
                      >
                        <option value="">Select Province</option>
                        <option value="Western">Western</option>
                        <option value="Central">Central</option>
                        <option value="Southern">Southern</option>
                        <option value="Northern">Northern</option>
                        <option value="Eastern">Eastern</option>
                        <option value="North Western">North Western</option>
                        <option value="North Central">North Central</option>
                        <option value="Uva">Uva</option>
                        <option value="Sabaragamuwa">Sabaragamuwa</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="postalCode">Postal Code *</label>
                      <input
                        type="text"
                        id="postalCode"
                        value={shippingDetails.postalCode}
                        onChange={(e) => handleShippingInputChange('postalCode', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        id="country"
                        value={shippingDetails.country}
                        disabled
                        className="disabled-input"
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="btn-secondary"
                      onClick={() => setCheckoutStep('cart')}
                    >
                      Back to Cart
                    </button>
                    <button type="submit" className="btn-primary">
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>

              <div className="order-summary-sidebar">
                <div className="summary-card">
                  <h3 className="summary-title">Order Summary</h3>
                  
                  <div className="summary-items">
                    {cartItems.slice(0, 3).map((item) => (
                      <div key={item.cartId} className="summary-item">
                        <img src={item.image} alt={item.name} className="summary-item-image" />
                        <div className="summary-item-details">
                          <p className="summary-item-name">{item.name}</p>
                          <p className="summary-item-info">
                            {item.selectedSize} • {item.selectedColor} • Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="summary-item-price">
                          LKR {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    {cartItems.length > 3 && (
                      <div className="summary-more">
                        +{cartItems.length - 3} more items
                      </div>
                    )}
                  </div>

                  <div className="summary-line">
                    <span>Subtotal:</span>
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
                  
                  <div className="summary-line total-line">
                    <span>Total:</span>
                    <span className="final-total">LKR {finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {checkoutStep === 'payment' && (
          <Payment
            orderTotal={finalTotal}
            shippingDetails={shippingDetails}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={() => setCheckoutStep('shipping')}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;