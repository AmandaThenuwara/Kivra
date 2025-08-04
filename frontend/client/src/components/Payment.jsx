import React, { useState } from 'react';
import './Payment.css';

const Payment = ({ orderTotal, shippingDetails, onPaymentSuccess, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    cardType: ''
  });
  const [billingAddress, setBillingAddress] = useState({
    sameAsShipping: true,
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Sri Lanka'
  });
  const [errors, setErrors] = useState({});

  // Card validation functions
  const detectCardType = (number) => {
    const cleaned = number.replace(/\s+/g, '');
    
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';
    
    return '';
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = cleaned.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return match;
    }
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\s+/g, '');
    
    if (cleaned.length < 13 || cleaned.length > 19) {
      return false;
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned.charAt(i), 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  const validateExpiryDate = (expiry) => {
    const [month, year] = expiry.split('/');
    if (!month || !year) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month, 10);
    const expYear = parseInt(year, 10);
    
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
  };

  const validateCVV = (cvv, cardType) => {
    if (cardType === 'amex') {
      return /^\d{4}$/.test(cvv);
    }
    return /^\d{3}$/.test(cvv);
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
      const cardType = detectCardType(formattedValue);
      setCardDetails(prev => ({ ...prev, cardType }));
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, cardDetails.cardType === 'amex' ? 4 : 3);
    } else if (field === 'cardholderName') {
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
    }
    
    setCardDetails(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBillingAddressChange = (field, value) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      // Card validation
      if (!cardDetails.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!validateCardNumber(cardDetails.cardNumber)) {
        newErrors.cardNumber = 'Invalid card number';
      }

      if (!cardDetails.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!validateExpiryDate(cardDetails.expiryDate)) {
        newErrors.expiryDate = 'Invalid or expired date';
      }

      if (!cardDetails.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!validateCVV(cardDetails.cvv, cardDetails.cardType)) {
        newErrors.cvv = `Invalid CVV (${cardDetails.cardType === 'amex' ? '4' : '3'} digits required)`;
      }

      if (!cardDetails.cardholderName.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      } else if (cardDetails.cardholderName.trim().length < 2) {
        newErrors.cardholderName = 'Cardholder name is too short';
      }

      // Billing address validation (if different from shipping)
      if (!billingAddress.sameAsShipping) {
        if (!billingAddress.address.trim()) {
          newErrors.billingAddress = 'Billing address is required';
        }
        if (!billingAddress.city.trim()) {
          newErrors.billingCity = 'City is required';
        }
        if (!billingAddress.province.trim()) {
          newErrors.billingProvince = 'Province is required';
        }
        if (!billingAddress.postalCode.trim()) {
          newErrors.billingPostalCode = 'Postal code is required';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create payment data
      const paymentData = {
        method: paymentMethod,
        amount: orderTotal,
        currency: 'LKR',
        cardDetails: paymentMethod === 'card' ? {
          last4: cardDetails.cardNumber.slice(-4),
          cardType: cardDetails.cardType,
          cardholderName: cardDetails.cardholderName
        } : null,
        billingAddress: billingAddress.sameAsShipping ? shippingDetails : billingAddress,
        timestamp: new Date().toISOString(),
        transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };

      onPaymentSuccess(paymentData);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardIcon = (cardType) => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳'
    };
    return icons[cardType] || '💳';
  };

  return (
    <div className="payment-gateway">
      <div className="payment-container">
        <div className="payment-form-section">
          <h2 className="payment-title">Payment Information</h2>

          {/* Payment Methods */}
          <div className="payment-methods">
            <h3>Choose Payment Method</h3>
            <div className="payment-options">
              <div 
                className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <input 
                  type="radio" 
                  id="card" 
                  name="payment" 
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="card">Credit/Debit Card</label>
                <div className="card-icons">
                  <span title="Visa">💳</span>
                  <span title="Mastercard">💳</span>
                  <span title="American Express">💳</span>
                </div>
              </div>

              <div 
                className={`payment-option ${paymentMethod === 'amazon' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('amazon')}
              >
                <input 
                  type="radio" 
                  id="amazon" 
                  name="payment" 
                  value="amazon"
                  checked={paymentMethod === 'amazon'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="amazon">Amazon Pay</label>
                <div className="payment-badge">
                  <span className="amazon-badge">📦 Amazon</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Details Form */}
          {paymentMethod === 'card' && (
            <div className="card-details-form">
              <h3>Card Details</h3>
              
              <div className="form-group">
                <label htmlFor="cardNumber">
                  Card Number *
                  {cardDetails.cardType && (
                    <span className="card-type-indicator">
                      {getCardIcon(cardDetails.cardType)} {cardDetails.cardType.toUpperCase()}
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleCardInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength="23"
                  className={errors.cardNumber ? 'error' : ''}
                />
                {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={(e) => handleCardInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={errors.expiryDate ? 'error' : ''}
                  />
                  {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">
                    CVV *
                    <span className="cvv-help">
                      {cardDetails.cardType === 'amex' ? '4 digits on front' : '3 digits on back'}
                    </span>
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardInputChange('cvv', e.target.value)}
                    placeholder={cardDetails.cardType === 'amex' ? '1234' : '123'}
                    maxLength={cardDetails.cardType === 'amex' ? '4' : '3'}
                    className={errors.cvv ? 'error' : ''}
                  />
                  {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cardholderName">Cardholder Name *</label>
                <input
                  type="text"
                  id="cardholderName"
                  value={cardDetails.cardholderName}
                  onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
                  placeholder="John Doe"
                  className={errors.cardholderName ? 'error' : ''}
                />
                {errors.cardholderName && <span className="error-message">{errors.cardholderName}</span>}
              </div>

              {/* Billing Address */}
              <div className="billing-address-section">
                <h3>Billing Address</h3>
                
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={billingAddress.sameAsShipping}
                      onChange={(e) => handleBillingAddressChange('sameAsShipping', e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Same as shipping address
                  </label>
                </div>

                {!billingAddress.sameAsShipping && (
                  <div className="billing-form">
                    <div className="form-group">
                      <label htmlFor="billingAddress">Address *</label>
                      <input
                        type="text"
                        id="billingAddress"
                        value={billingAddress.address}
                        onChange={(e) => handleBillingAddressChange('address', e.target.value)}
                        placeholder="Street address"
                        className={errors.billingAddress ? 'error' : ''}
                      />
                      {errors.billingAddress && <span className="error-message">{errors.billingAddress}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="billingCity">City *</label>
                        <input
                          type="text"
                          id="billingCity"
                          value={billingAddress.city}
                          onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                          className={errors.billingCity ? 'error' : ''}
                        />
                        {errors.billingCity && <span className="error-message">{errors.billingCity}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="billingProvince">Province *</label>
                        <select
                          id="billingProvince"
                          value={billingAddress.province}
                          onChange={(e) => handleBillingAddressChange('province', e.target.value)}
                          className={errors.billingProvince ? 'error' : ''}
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
                        {errors.billingProvince && <span className="error-message">{errors.billingProvince}</span>}
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="billingPostalCode">Postal Code *</label>
                        <input
                          type="text"
                          id="billingPostalCode"
                          value={billingAddress.postalCode}
                          onChange={(e) => handleBillingAddressChange('postalCode', e.target.value)}
                          className={errors.billingPostalCode ? 'error' : ''}
                        />
                        {errors.billingPostalCode && <span className="error-message">{errors.billingPostalCode}</span>}
                      </div>

                      <div className="form-group">
                        <label htmlFor="billingCountry">Country</label>
                        <input
                          type="text"
                          id="billingCountry"
                          value={billingAddress.country}
                          disabled
                          className="disabled-input"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Amazon Pay */}
          {paymentMethod === 'amazon' && (
            <div className="amazon-pay-section">
              <div className="amazon-pay-info">
                <h3>Amazon Pay</h3>
                <p>You'll be redirected to Amazon to complete your payment securely.</p>
                <div className="amazon-benefits">
                  <div className="benefit-item">
                    <span className="benefit-icon">🔒</span>
                    <span>Secure payment with your Amazon account</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">⚡</span>
                    <span>Fast checkout with saved payment methods</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-icon">🛡️</span>
                    <span>Amazon's A-to-Z Guarantee protection</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Actions */}
          <div className="payment-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={onBack}
              disabled={isProcessing}
            >
              Back to Shipping
            </button>
            
            <button 
              className={`btn-primary pay-button ${isProcessing ? 'processing' : ''}`}
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="spinner"></span>
                  Processing Payment...
                </>
              ) : (
                <>
                  {paymentMethod === 'amazon' ? '🚀 Pay with Amazon' : '💳 Pay Now'} LKR {orderTotal.toLocaleString()}
                </>
              )}
            </button>
          </div>

          <div className="security-notice">
            <div className="security-icons">
              <span>🔒</span>
              <span>🛡️</span>
              <span>✅</span>
            </div>
            <p>Your payment information is encrypted and secure. We never store your card details.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
