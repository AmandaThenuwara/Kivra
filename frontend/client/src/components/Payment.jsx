import React, { useState } from 'react';

const Payment = ({ onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
    }

    setCardData({
      ...cardData,
      [name]: formattedValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    return 'generic';
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-charcoal mb-2">Payment Information</h2>
        <p className="text-charcoal">Complete your purchase securely</p>
      </div>

      {/* Payment Methods */}
      <div>
        <h3 className="text-lg font-semibold text-charcoal mb-4">Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              paymentMethod === 'card'
                ? 'border-primary-gold bg-gold-light'
                : 'border-shadow hover:border-primary-gold'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <span className="font-medium text-charcoal">Credit Card</span>
            </div>
          </button>

          <button
            onClick={() => setPaymentMethod('paypal')}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              paymentMethod === 'paypal'
                ? 'border-primary-gold bg-gold-light'
                : 'border-shadow hover:border-primary-gold'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-burgundy rounded-full flex items-center justify-center">
                <span className="text-primary-white font-bold text-sm">P</span>
              </div>
              <span className="font-medium text-charcoal">PayPal</span>
            </div>
          </button>

          <button
            onClick={() => setPaymentMethod('apple')}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              paymentMethod === 'apple'
                ? 'border-primary-gold bg-gold-light'
                : 'border-shadow hover:border-primary-gold'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <span className="font-medium text-charcoal">Apple Pay</span>
            </div>
          </button>
        </div>
      </div>

      {/* Credit Card Form */}
      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                name="number"
                value={cardData.number}
                onChange={handleCardChange}
                className="input-field pr-12"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-5 bg-gold-light rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-black">
                    {getCardType(cardData.number) === 'visa' ? 'VISA' : 
                     getCardType(cardData.number) === 'mastercard' ? 'MC' :
                     getCardType(cardData.number) === 'amex' ? 'AMEX' : '••'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              name="name"
              value={cardData.name}
              onChange={handleCardChange}
              className="input-field"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiry"
                value={cardData.expiry}
                onChange={handleCardChange}
                className="input-field"
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={cardData.cvv}
                onChange={handleCardChange}
                className="input-field"
                placeholder="123"
                maxLength="4"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-black mr-2"></div>
                Processing Payment...
              </div>
            ) : (
              'Complete Payment'
            )}
          </button>
        </form>
      )}

      {/* PayPal Payment */}
      {paymentMethod === 'paypal' && (
        <div className="space-y-6">
          <div className="bg-gold-light/20 p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-burgundy rounded-full flex items-center justify-center">
                <span className="text-primary-white font-bold">P</span>
              </div>
              <div>
                <h4 className="font-semibold text-charcoal">PayPal</h4>
                <p className="text-sm text-charcoal">Pay with your PayPal account</p>
              </div>
            </div>
            <p className="text-sm text-charcoal">
              You will be redirected to PayPal to complete your payment securely.
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="btn-secondary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Pay with PayPal'}
          </button>
        </div>
      )}

      {/* Apple Pay */}
      {paymentMethod === 'apple' && (
        <div className="space-y-6">
          <div className="bg-gold-light/20 p-6 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-charcoal">Apple Pay</h4>
                <p className="text-sm text-charcoal">Pay with Apple Pay</p>
              </div>
            </div>
            <p className="text-sm text-charcoal">
              Use your Apple Pay account for a quick and secure payment.
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="bg-charcoal text-primary-white w-full py-4 rounded-lg font-medium hover:bg-charcoal/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Pay with Apple Pay'}
          </button>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-burgundy-light/10 p-4 rounded-lg border border-burgundy-light">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-primary-gold mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-semibold text-charcoal mb-1">Secure Payment</h4>
            <p className="text-sm text-charcoal">
              Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
